<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import Hls, { type ErrorData, Events, type Level } from 'hls.js';
  import { detectSourceType } from '@entities/video-player-core/lib';
  import type {
    BaseVideoPlayerError,
    BaseVideoPlayerErrorCode,
    IVideoPlayerProgressData,
    IVideoPlayerState,
    ManifestParsedData,
    SourceType,
  } from '@entities/video-player-core/model';
  import { debounce } from '@shared/lib/utils';

  interface Props {
    src: string;
    poster?: string;
    autoplay?: boolean;
    classes?: string | string[] | object;
    storageKeyPrefix?: string;
  }

  const generateId = () => crypto?.randomUUID() ?? Math.random().toString(36).slice(2, 9);

  let hls: Hls | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let controlsTimeout: number | null = null;

  const instanceId = generateId();
  let currentInstance = instanceId;

  const props = withDefaults(defineProps<Props>(), {
    poster: '',
    autoplay: false,
    storageKeyPrefix: 'video-player-core:',
  });

  const emit = defineEmits<{
    (event: 'end'): void;
    (event: 'levels', value: ManifestParsedData['levels']): void;
    (event: 'error', value: BaseVideoPlayerError): void;
    (event: 'ManifestParsedData', value: ManifestParsedData): void;
    (event: 'update:progress', value: IVideoPlayerProgressData): void;
    (event: 'update:state', value: IVideoPlayerState): void;
    (event: 'fullscreen-change', value: boolean): void;
    (event: 'volume-change', value: Event): void;
    (event: 'can-play'): void;
    (event: 'loaded-data'): void;

    // HLS lifecycle
    (event: 'hls-manifest-loading'): void;
    (event: 'hls-manifest-loaded', value: { levels: number }): void;
    (event: 'hls-manifest-parsed', value: ManifestParsedData, qualities: number[]): void;
    (event: 'hls-level-switching', value: number): void;
    (event: 'hls-level-switched', value: number): void;

    // Buffer
    (event: 'hls-buffer-appending'): void;
    (event: 'hls-buffer-appended'): void;
    (event: 'hls-buffer-eos'): void;
    (event: 'hls-buffer-flushed'): void;

    // Fragments
    (event: 'hls-frag-loading', value: { frag: unknown }): void;
    (event: 'hls-frag-loaded', value: { frag: unknown }): void;
    (event: 'hls-frag-buffered', value: { frag: unknown }): void;
    (event: 'hls-frag-changed', value: { frag: unknown }): void;

    // Audio / Subtitles
    (event: 'hls-audio-tracks-updated', value: unknown[]): void;
    (event: 'hls-audio-track-switched', value: number): void;
    (event: 'hls-subtitle-tracks-updated', value: unknown[]): void;
    (event: 'hls-subtitle-track-switched', value: number): void;

    // FPS / QoE
    // (event: 'hls-fps-drop', value: unknown): void;
    // (event: 'hls-fps-drop-level-capping', value: unknown): void;

    // DRM keys
    // (event: 'hls-key-loading', value: unknown): void;
    // (event: 'hls-key-loaded', value: unknown): void;

    // Destroy
    // (event: 'hls-destroyed'): void;
  }>();

  const currentTime = defineModel<number>('currentTime', { default: 0 });
  const duration = defineModel<number>('duration', { default: 0 });
  const buffered = defineModel<number>('buffered', { default: 0 });
  const volume = defineModel<number>('volume', { default: 1 });
  const quality = defineModel<number | 'auto'>('quality', { default: 'auto' });
  const isPlaying = defineModel<boolean>('isPlaying', { default: false });
  const isBuffering = defineModel<boolean>('isBuffering', { default: false });
  const isFullscreen = defineModel<boolean>('isFullscreen', { default: false });
  const muted = defineModel<boolean>('muted', { default: false });
  const loading = defineModel<boolean>('loading', { default: false });
  const isPip = defineModel<boolean>('isPip', { default: false });

  const videoRef = ref<HTMLVideoElement | null>(null);
  const containerRef = ref<HTMLElement | null>(null);
  const sourceType = ref<SourceType | null>(null);
  const focused = ref<boolean>(false);
  const isControls = ref<boolean>(true);

  const syncEmit = () => {
    emit('update:state', {
      isPlaying: isPlaying.value,
      isBuffering: isBuffering.value,
      isFullscreen: isFullscreen.value,
      muted: muted.value,
      volume: volume.value,
      quality: quality.value,
    });
  };

  /**
   * ===== Ошибки =====
   */
  const emitError = (code: BaseVideoPlayerErrorCode, err: unknown) => {
    const error =
      err instanceof Error ? err : typeof err === 'string' ? new Error(err) : new Error(JSON.stringify(err));
    console.warn(`[VideoPlayerError:${code}]`, error);

    emit('error', { codeError: code, error });
  };

  // ===== =====
  const stepSeek = (seconds: number) => {
    const v = videoRef.value;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(duration.value || Infinity, v.currentTime + seconds));
  };
  const adjustVolume = (delta: number) => {
    const v = videoRef.value;
    if (!v) return;
    const newVol = Math.max(0, Math.min(1, (v.volume || 0) + delta));
    volume.value = newVol;
    v.volume = newVol;
    muted.value = newVol === 0;
  };
  const storageKeyFor = (src: string) => `${props.storageKeyPrefix}${encodeURIComponent(src)}`;
  const persistPosition = debounce((src: string, time: number) => {
    try {
      localStorage.setItem(storageKeyFor(src), JSON.stringify({ time, updated: Date.now() }));
    } catch (e) {
      emitError('STORAGE.SAVE_ERROR', e);
    }
  }, 1000);
  const readSavedPosition = (src: string): number | null => {
    try {
      const raw = localStorage.getItem(storageKeyFor(src));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.time === 'number') return parsed.time;
    } catch (e) {
      emitError('STORAGE.READ_ERROR', e);
    }
    return null;
  };
  const savePosition = () => {
    const video = videoRef.value;
    if (!video) return;
    const saved = readSavedPosition(props.src);
    if (saved && video.duration && saved < video.duration - 1) {
      try {
        video.currentTime = saved;
      } catch {
        //...
      }
    } else if (saved && !video.duration) {
      const once = () => {
        if (!video) return;
        const saved2 = readSavedPosition(props.src);
        if (saved2 && saved2 < video.duration - 1) {
          try {
            video.currentTime = saved2;
          } catch {
            //...
          }
        }
        video.removeEventListener('loadedmetadata', once);
      };
      video.addEventListener('loadedmetadata', once);
    }
  };
  const updateBuffered = () => {
    const video = videoRef.value;
    if (!video) return;

    let bufferedEnd = 0;
    for (let i = 0; i < video.buffered.length; i++) {
      const start = video.buffered.start(i);
      const end = video.buffered.end(i);

      if (video.currentTime >= start && video.currentTime <= end) {
        bufferedEnd = end;
        break;
      }
    }

    buffered.value = bufferedEnd;
  };
  const resetControlsTimeout = () => {
    isControls.value = true;
    if (controlsTimeout) clearTimeout(controlsTimeout);

    if (isPlaying.value) {
      controlsTimeout = window.setTimeout(() => {
        isControls.value = false;
        containerRef.value?.blur();
      }, 3000);
    }
  };
  // const changeQuality = () => {
  // if (!hls) return;
  // if (quality.value === 'auto') {
  //   hls.currentLevel = -1;
  // } else {
  //   const levels = hls.levels;
  //   const target = localQuality.value as number;
  // const idx = levels.findIndex((l) => l.height === target);
  // hls.currentLevel = idx >= 0 ? idx : Number(localQuality.value);
  // store.setCurrentQuality(hls.currentLevel);
  // }
  // };

  const MEDIA_ATTACHED = () => {
    try {
      hls?.loadSource(props.src);
    } catch (e) {
      emitError('HLS.LOADING_SOURCE', e);
    }
  };
  const MANIFEST_LOADING = () => {
    emit('hls-manifest-loading');
  };
  const MANIFEST_LOADED = (_, data) => {
    emit('hls-manifest-loaded', { levels: data.levels?.length ?? 0 });
  };
  const MANIFEST_PARSED = (_, data) => {
    const levels = data?.levels ?? [];
    const qualities = levels.map((l: Level, idx: number) => {
      if (l.height) return l.height;
      if (l.bitrate) return Math.round(l.bitrate / 1000);
      return idx;
    });

    emit('hls-manifest-parsed', data, qualities);
    emit('levels', data.levels);
    loading.value = false;
  };
  const BUFFER_APPENDING = () => {
    emit('hls-buffer-appending');
  };
  const BUFFER_APPENDED = () => {
    emit('hls-buffer-appended');
  };
  const BUFFER_EOS = () => {
    emit('hls-buffer-eos');
  };
  const BUFFER_FLUSHED = () => {
    emit('hls-buffer-flushed');
  };
  const FRAG_LOADING = (_, data) => {
    emit('hls-frag-loading', { frag: data.frag });
  };
  const FRAG_LOADED = (_, data) => {
    emit('hls-frag-loaded', { frag: data.frag });
  };
  const FRAG_BUFFERED = (_, data) => {
    emit('hls-frag-buffered', { frag: data.frag });
  };
  const FRAG_CHANGED = (_, data) => {
    emit('hls-frag-changed', { frag: data.frag });
  };
  const AUDIO_TRACKS_UPDATED = (_, data) => {
    emit('hls-audio-tracks-updated', data.audioTracks);
  };
  const AUDIO_TRACK_SWITCHED = (_, data) => {
    emit('hls-audio-track-switched', data.id);
  };
  const SUBTITLE_TRACKS_UPDATED = (_, data) => {
    emit('hls-subtitle-tracks-updated', data.subtitleTracks);
  };
  const SUBTITLE_TRACK_SWITCH = (_, data) => {
    emit('hls-subtitle-track-switched', data.id);
  };
  const ERROR = (_, data: ErrorData) => {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          emitError('HLS.NETWORK_ERROR', data);
          hls?.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          emitError('HLS.MEDIA_ERROR', data);
          hls?.recoverMediaError();
          break;
        default:
          emitError('HLS.UNKNOWN', data);
          hls?.destroy();
          break;
      }
    } else {
      emitError('HLS.UNKNOWN', data);
    }
  };

  // лучше Map, а не WeakMap
  const listeners = new Map([
    [Events.MEDIA_ATTACHED, MEDIA_ATTACHED],
    [Events.MANIFEST_LOADING, MANIFEST_LOADING],
    [Events.MANIFEST_LOADED, MANIFEST_LOADED],
    [Events.MANIFEST_PARSED, MANIFEST_PARSED],
    [Events.BUFFER_APPENDING, BUFFER_APPENDING],
    [Events.BUFFER_APPENDED, BUFFER_APPENDED],
    [Events.BUFFER_EOS, BUFFER_EOS],
    [Events.BUFFER_FLUSHED, BUFFER_FLUSHED],
    [Events.FRAG_LOADING, FRAG_LOADING],
    [Events.FRAG_LOADED, FRAG_LOADED],
    [Events.FRAG_BUFFERED, FRAG_BUFFERED],
    [Events.FRAG_CHANGED, FRAG_CHANGED],
    [Events.AUDIO_TRACKS_UPDATED, AUDIO_TRACKS_UPDATED],
    [Events.AUDIO_TRACK_SWITCHED, AUDIO_TRACK_SWITCHED],
    [Events.SUBTITLE_TRACKS_UPDATED, SUBTITLE_TRACKS_UPDATED],
    [Events.SUBTITLE_TRACK_SWITCH, SUBTITLE_TRACK_SWITCH],
    [Events.ERROR, ERROR],
  ]);

  function attachListeners(hls: Hls) {
    listeners.forEach((handler, event) => {
      hls.on(event, handler);
    });
  }

  function detachListeners(hls: Hls) {
    listeners.forEach((handler, event) => {
      hls?.off(event, handler);
    });
  }

  /**
   * ===== Player Core =====
   */
  const initPlayer = async (src: string, thisInstanceId = instanceId) => {
    const video = videoRef.value;
    if (!video) return;

    loading.value = true;

    const detected = await detectSourceType(src ?? '');
    if (currentInstance !== thisInstanceId) return;

    if (detected === 'hls') {
      sourceType.value = 'hls';
    } else if (detected === 'progressive') {
      sourceType.value = 'progressive';
    } else {
      sourceType.value = 'progressive';
    }

    try {
      destroyPlayer();

      if (sourceType.value === 'hls') {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          video.load();
        } else if (Hls.isSupported()) {
          hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
          });

          attachListeners(hls);
          console.log('attached');
          hls.attachMedia(video);
        }
      } else {
        try {
          video.src = src;
          video.volume = volume.value;
          video.muted = muted.value;
          video.load();
        } catch (e) {
          emitError('VIDEO.SRC_ERROR', e);
        }
      }

      await nextTick();
      savePosition();

      if (props.autoplay) {
        try {
          await video.play();
          isPlaying.value = true;
        } catch (e) {
          emitError('VIDEO.AUTOPLAY_ERROR', e);
          isPlaying.value = false;
        }
      }

      attachNativeErrorHandlers(video);
    } catch {
      //...
    } finally {
      if (timeout) {
        clearInterval(timeout);
      } else {
        timeout = setTimeout(() => {
          loading.value = false;
          clearInterval(timeout!);
          timeout = null;
        }, 200);
      }
    }
  };

  /**
   * ===== Очистка =====
   */
  const destroyPlayer = () => {
    if (videoRef.value) {
      try {
        if (props.src) {
          persistPosition(props.src, videoRef.value.currentTime);
        }
        videoRef.value.pause();
      } catch (e) {
        emitError('VIDEO.DESTROY_ERROR', e);
      }
    }
    detachNativeErrorHandlers(videoRef.value);
    detachListeners(hls!);
    hls?.destroy();
    hls = null;

    currentTime.value = 0;
    duration.value = 0;
    buffered.value = 0;
    volume.value = 1;
    quality.value = 'auto';
    isPlaying.value = false;
    isBuffering.value = false;
    isFullscreen.value = false;
    muted.value = false;
    loading.value = false;

    syncEmit();
  };

  const handleNativeError = (ev: Event) => {
    const target = ev.target as EventTarget & Partial<Record<'error', MediaError | null>>;
    const err = target && 'error' in target ? target.error : null;
    if (!err) {
      emitError('VIDEO.MEDIA_UNKNOWN', ev);
      return;
    }
    switch (err.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        emitError('VIDEO.MEDIA_ERR_ABORTED', err);
        break;
      case MediaError.MEDIA_ERR_NETWORK:
        emitError('VIDEO.MEDIA_ERR_NETWORK', err);
        break;
      case MediaError.MEDIA_ERR_DECODE:
        emitError('VIDEO.MEDIA_ERR_DECODE', err);
        break;
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        emitError('VIDEO.MEDIA_ERR_SRC_NOT_SUPPORTED', err);
        break;
      default:
        emitError('VIDEO.MEDIA_UNKNOWN', err);
        break;
    }
  };

  /**
   * ===== Native Error Events =====
   */
  const attachNativeErrorHandlers = (video: HTMLVideoElement | null) => {
    video?.addEventListener('error', handleNativeError);
  };
  const detachNativeErrorHandlers = (video: HTMLVideoElement | null) => {
    video?.removeEventListener('error', handleNativeError);
  };

  // ===== Toggles =====
  const toggleFullscreen = async () => {
    const el = containerRef.value;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        isFullscreen.value = true;
      } else {
        await document.exitFullscreen();
        isFullscreen.value = false;
      }
      emit('fullscreen-change', isFullscreen.value);
      syncEmit();
    } catch (e) {
      emitError('VIDEO.FULLSCREEN_ERROR', e);
    }
  };
  const togglePip = async () => {
    const v = videoRef.value;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        isPip.value = false;
      } else {
        await v.requestPictureInPicture();
        isPip.value = true;
      }
    } catch (e) {
      console.warn('PiP failed', e);
    }
  };
  const toggleMute = () => {
    const v = videoRef.value;
    if (!v) return;
    v.muted = muted.value = !muted.value;
    if (!muted.value && v.volume === 0) {
      v.volume = volume.value = 0.5;
    }
  };
  const togglePlay = async () => {
    const v = videoRef.value;
    if (!v) return;
    if (isPlaying.value) {
      v.pause();
    } else {
      try {
        await v.play();
        isPlaying.value = true;
      } catch {
        //...
      }
    }
  };

  /**
   * ===== Handlers =====
   */
  const onLoadedMetadata = () => {
    if (!videoRef.value) return;
    duration.value = videoRef.value.duration || 0;

    savePosition();
  };
  const onTimeUpdate = () => {
    if (!videoRef.value) return;
    currentTime.value = videoRef.value.currentTime;
    persistPosition(props.src, videoRef.value.currentTime);
    updateBuffered();

    emit('update:progress', {
      duration: duration.value,
      currentTime: currentTime.value,
      buffered: buffered.value,
    });
  };
  const onProgress = () => {
    const v = videoRef.value;
    if (!v || !v.buffered.length) return;
    updateBuffered();
    emit('update:progress', {
      duration: duration.value,
      currentTime: currentTime.value,
      buffered: buffered.value,
    });
  };
  const onSeeking = () => {
    isBuffering.value = true;
    syncEmit();
    updateBuffered();
  };
  const onSeeked = () => {
    isBuffering.value = false;
    syncEmit();
    updateBuffered();
  };
  const onCanPlay = () => {
    // Когда браузер может воспроизводить — снимаем флаг буфера
    isBuffering.value = false;
    syncEmit();
    emit('can-play');
  };
  const onLoadedData = () => {
    emit('loaded-data');
    loading.value = false;
  };
  const onPlay = () => {
    isPlaying.value = true;
    syncEmit();
  };
  const onPause = () => {
    isPlaying.value = false;
    syncEmit();
  };
  const onWaiting = () => {
    isBuffering.value = true;
    syncEmit();
  };
  const onPlaying = () => {
    isBuffering.value = false;
    syncEmit();
  };
  const onEnded = () => {
    isPlaying.value = false;
    try {
      localStorage.removeItem(storageKeyFor(props.src));
    } catch (e) {
      emitError('STORAGE.REMOVE_ERROR', e);
    }
    emit('end');
  };
  const onVolumeChange = (value: number) => {
    if (!videoRef.value) return;

    volume.value = videoRef.value.volume = value;
    muted.value = videoRef.value.muted = value === 0;

    syncEmit();
  };
  const onFocus = () => {
    focused.value = true;
  };
  const onBlur = () => {
    focused.value = false;
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (!isFullscreen.value) return;
    switch (e.key) {
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        stepSeek(-5);
        break;
      case 'ArrowRight':
        e.preventDefault();
        stepSeek(5);
        break;
      case 'ArrowUp':
        e.preventDefault();
        adjustVolume(0.05);
        break;
      case 'ArrowDown':
        e.preventDefault();
        adjustVolume(-0.05);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMute();
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        togglePip();
        break;
    }
  };

  /**
   * ===== Watchers =====
   */
  watch(
    () => props.src,
    (newSrc) => {
      loading.value = true;
      const myId = generateId();
      currentInstance = myId;

      destroyPlayer();
      initPlayer(newSrc, myId);
    }
  );

  /**
   * ===== Lifecycle =====
   */
  onMounted(() => {
    initPlayer(props.src, instanceId);

    const events = ['mousemove', 'click', 'keydown', 'touchstart'];
    events.forEach((ev) => {
      containerRef.value?.addEventListener(ev, resetControlsTimeout);
    });

    resetControlsTimeout();
  });

  onUnmounted(() => {
    destroyPlayer();

    const events = ['mousemove', 'click', 'keydown', 'touchstart'];
    events.forEach((ev) => {
      containerRef.value?.removeEventListener(ev, resetControlsTimeout);
    });

    if (controlsTimeout) clearTimeout(controlsTimeout);
  });

  /**
   * Expose
   */
  defineExpose({
    ref: videoRef,
    toggleFullscreen,
    togglePip,
    toggleMute,
    togglePlay,
    onVolumeChange,
  });
</script>

<template>
  <div
    ref="containerRef"
    class="BaseVideoPlayer"
    :class="[{ paused: !isPlaying, fullscreen: isFullscreen }, classes]"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeyDown"
  >
    <video
      ref="videoRef"
      class="BaseVideoPlayer__video"
      playsinline
      :poster="poster"
      :muted="muted"
      @volumechange="emit('volume-change', $event)"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @play="onPlay"
      @pause="onPause"
      @waiting="onWaiting"
      @playing="onPlaying"
      @ended="onEnded"
      @progress="onProgress"
      @seeking="onSeeking"
      @seeked="onSeeked"
      @canplay="onCanPlay"
      @loadeddata="onLoadedData"
    />

    <slot
      :muted="muted"
      :volume="volume"
      :quality="quality"
      :duration="duration"
      :loading="loading"
      :buffered="buffered"
      :current-time="currentTime"
      :is-controls="isControls"
      :is-pip="isPip"
      :is-playing="isPlaying"
      :is-buffering="isBuffering"
      :is-fullscreen="isFullscreen"
      :toggle-pip="togglePip"
      :toggle-play="togglePlay"
      :toggle-fullscreen="toggleFullscreen"
    />
  </div>
</template>

<style>
  .BaseVideoPlayer {
    overflow: hidden;
    user-select: none;
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000000;
  }
  .BaseVideoPlayer__video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
