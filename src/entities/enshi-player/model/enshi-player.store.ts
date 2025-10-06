// src/stores/useVideoStore.ts
import { defineStore } from 'pinia';

export type SourceType = 'auto' | 'hls' | 'progressive';

interface State {
  isPlaying: boolean;
  isBuffering: boolean;
  duration: number;
  currentTime: number;
  buffered: number;
  volume: number;
  muted: boolean;
  isFullscreen: boolean;
  isPip: boolean;
  loading: boolean;
  currentQuality: number | 'auto';
  sourceType: SourceType;
  lastError: string;
  qualities: {
    value: number;
    label: string;
  }[];
}

export const useVideoStore = defineStore('video', {
  state: (): State => ({
    isPlaying: false,
    isBuffering: false,
    duration: 0,
    currentTime: 0,
    buffered: 0,
    volume: 1,
    muted: false,
    isFullscreen: false,
    isPip: false,
    loading: false,
    currentQuality: 'auto',
    sourceType: 'auto',
    qualities: [],
    lastError: '',
  }),

  actions: {
    setPlaying(v: State['isPlaying']) {
      this.isPlaying = v;
    },
    setBuffering(v: State['isBuffering']) {
      this.isBuffering = v;
    },
    setDuration(v: State['duration']) {
      this.duration = v;
    },
    setCurrentTime(v: State['currentTime']) {
      this.currentTime = v;
    },
    setBuffered(v: State['buffered']) {
      this.buffered = v;
    },
    setVolume(v: State['volume']) {
      this.volume = v;
    },
    setMuted(v: State['muted']) {
      this.muted = v;
    },
    setFullscreen(v: State['isFullscreen']) {
      this.isFullscreen = v;
    },
    setPip(v: State['isPip']) {
      this.isPip = v;
    },
    setLoading(v: State['loading']) {
      this.loading = v;
    },
    setQuality(v: State['qualities']) {
      this.qualities = v;
    },
    setCurrentQuality(q: State['currentQuality']) {
      this.currentQuality = q;
    },
    setSourceType(t: State['sourceType']) {
      this.sourceType = t;
    },
    setError(msg: State['lastError']) {
      this.lastError = msg;
    },
  },
});
