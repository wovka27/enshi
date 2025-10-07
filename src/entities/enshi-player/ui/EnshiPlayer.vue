<script setup lang="ts">
  import { computed, nextTick, onUnmounted, onUpdated, ref } from 'vue';
  import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';
  import EnshiPlayerControls from '@entities/enshi-player/ui/EnshiPlayerControls.vue';
  import EnshiPlayerQuality from '@entities/enshi-player/ui/EnshiPlayerQuality.vue';
  import PlayerLoader from '@entities/enshi-player/ui/PlayerLoader.vue';
  import VideoPlayerCore from '@entities/video-player-core/ui/VideoPlayerCore.vue';

  interface Props {
    src: string;
    poster?: string;
    autoplay?: boolean;
    storageKeyPrefix?: string;
    qualityOptions: { value: number; label: string }[];
    meta: {
      title: string;
      episodeNumber: string;
    };
  }

  const props = withDefaults(defineProps<Props>(), {
    poster: '',
    autoplay: false,
    storageKeyPrefix: 'video-player-core:',
  });

  const emit = defineEmits<{
    (event: 'end'): void;
    (event: 'next'): void;
    (event: 'prev'): void;
  }>();

  const store = useVideoStore();

  const playerRef = ref();
  const errorRegistry = ref<{ text: string; timer?: ReturnType<typeof setTimeout> }>({
    text: '',
    timer: undefined,
  });

  const isEnd = ref(false);
  const qualityIndex = ref(0);

  const qualityValues = computed(() => props.qualityOptions.map((option) => option.value));
  const currentQualityValue = computed(() => qualityValues.value[qualityIndex.value % qualityValues.value.length]);

  const toggleFullscreen = () => {
    playerRef.value?.toggleFullscreen();
  };
  const togglePip = () => {
    playerRef.value?.togglePip();
  };
  // const toggleMute = () => {
  //   playerRef.value?.toggleMute();
  // };
  const togglePlay = () => {
    playerRef.value?.togglePlay();
  };

  const updateSeek = (val: number) => {
    if (!playerRef.value) return;
    playerRef.value.ref.currentTime = val;
  };

  const onThumbKey = (e: KeyboardEvent) => {
    const v = playerRef.value?.ref;
    if (!v || !store.duration) return;
    if (e.key === 'ArrowLeft') v.currentTime = Math.max(0, v.currentTime - 5);
    if (e.key === 'ArrowRight') v.currentTime = Math.min(store.duration, v.currentTime + 5);
  };

  const onVolumeChange = (val: number) => {
    playerRef.value?.onVolumeChange(val);
  };

  const setError = (text: string) => {
    if (errorRegistry.value.timer) clearTimeout(errorRegistry.value.timer);
    errorRegistry.value = { text };
    errorRegistry.value.timer = setTimeout(() => {
      errorRegistry.value.text = '';
      errorRegistry.value.timer = undefined;
    }, 8000);
  };

  const changeCurrentQuality = () => {
    if (qualityIndex.value >= qualityValues.value.length - 1) return;
    qualityIndex.value++;
    store.setCurrentQuality(currentQualityValue.value);
  };

  const onError = (value: { codeError: string; error: string }) => {
    switch (value.codeError) {
      case 'VIDEO.MEDIA_ERR_SRC_NOT_SUPPORTED':
        changeCurrentQuality();
        if (qualityIndex.value >= qualityValues.value.length - 1) setError('Видео не воспроизводится');
        break;
      default:
        return;
    }
  };

  const handleEnd = async () => {
    emit('next');
    isEnd.value = true;
  };

  const handleLoadedData = async () => {
    if (!isEnd.value) return;
    store.setLoading(true);
    await nextTick();
    isEnd.value = false;
    store.setLoading(false);
    togglePlay();
  };

  const handleNext = () => {
    emit('next');
  };
  const handlePrev = () => {
    emit('prev');
  };

  onUpdated(() => {
    qualityIndex.value = 0;
  });

  defineExpose({ value: playerRef, toggleFullscreen });
</script>

<template>
  <VideoPlayerCore
    ref="playerRef"
    classes="EnshiPlayer"
    :src="src"
    :poster="poster"
    :muted="store.muted"
    :is-pip="store.isPip"
    :autoplay="autoplay"
    :volume="store.volume"
    :loading="store.loading"
    :duration="store.duration"
    :buffered="store.buffered"
    :is-playing="store.isPlaying"
    :current-time="store.currentTime"
    :is-buffering="store.isBuffering"
    :is-fullscreen="store.isFullscreen"
    :storage-key-prefix="storageKeyPrefix"
    @update:is-fullscreen="store.setFullscreen"
    @update:current-time="store.setCurrentTime"
    @update:is-buffering="store.setBuffering"
    @update:is-playing="store.setPlaying"
    @update:duration="store.setDuration"
    @update:buffered="store.setBuffered"
    @update:loading="store.setLoading"
    @update:volume="store.setVolume"
    @update:muted="store.setMuted"
    @update:is-pip="store.setPip"
    @error="onError"
    @loaded-data="handleLoadedData"
    @end="handleEnd"
  >
    <template #default="{ isControls }">
      <transition name="slide-fade">
        <div
          v-if="errorRegistry.text"
          class="EnshiPlayer__notification"
        >
          <p v-html="errorRegistry.text"></p>
        </div>
      </transition>
      <PlayerLoader v-if="store.loading" />
      <EnshiPlayerQuality
        v-if="isControls"
        v-model="store.currentQuality"
        :options="qualityOptions"
      />
      <EnshiPlayerControls
        :is-show="isControls"
        :meta="meta"
        @next="handleNext"
        @prev="handlePrev"
        @volume="onVolumeChange"
        @toggle-pip="togglePip"
        @toggle-fullscreen="toggleFullscreen"
        @thumb="onThumbKey"
        @seek="updateSeek"
        @toggle-play="togglePlay"
      />
    </template>
  </VideoPlayerCore>
</template>

<style lang="scss">
  .EnshiPlayer {
    position: relative;
    @include flex-center();
    border-radius: var(--border-radius-10);
    max-height: 466px;
    min-height: 430px;
    @include hover {
      .EnshiPlayer-controls-container {
        opacity: 1;
      }
    }
    &:focus-visible,
    &.paused {
      .EnshiPlayer-controls-container {
        opacity: 1;
      }
    }
    &.fullscreen {
      border-radius: 0;
    }
  }

  .EnshiPlayer__notification {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    transition: all var(--transition-duration);
    display: flex;
    align-items: center;
    overflow: hidden;
    text-align: center;
    padding: 10px 20px;
    background: linear-gradient(to bottom right, #f14a58, #e32636);
    z-index: 50;

    min-width: 300px;
    max-width: 400px;
    min-height: 50px;

    border-radius: var(--border-radius-10);
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.4s ease-in-out;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
</style>
