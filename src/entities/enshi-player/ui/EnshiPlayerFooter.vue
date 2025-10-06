<script setup lang="ts">
  import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';
  import EnshiPlayerDuration from '@entities/enshi-player/ui/EnshiPlayerDuration.vue';
  import EnshiPlayerFullScreen from '@entities/enshi-player/ui/EnshiPlayerFullScreen.vue';
  import EnshiPlayerIsPip from '@entities/enshi-player/ui/EnshiPlayerIsPip.vue';
  import EnshiPlayerMeta from '@entities/enshi-player/ui/EnshiPlayerMeta.vue';
  import EnshiPlayerVolumeControl from '@entities/enshi-player/ui/EnshiPlayerVolumeControl.vue';
  import TimeLine from '@entities/enshi-player/ui/TimeLine.vue';

  defineProps<{
    meta: {
      title: string;
      episodeNumber: string;
    };
  }>();
  defineEmits<{
    (event: 'seek', value: number): void;
    (event: 'thumb', value: KeyboardEvent): void;
    (event: 'volume', value: number): void;
    (event: 'togglePip'): void;
    (event: 'toggleFullscreen'): void;
  }>();

  const store = useVideoStore();
</script>

<template>
  <div class="EnshiPlayer-controls__footer">
    <EnshiPlayerMeta
      :title="meta.title"
      :episode-number="meta.episodeNumber"
    />
    <div class="EnshiPlayer-controls__footer-actions">
      <EnshiPlayerDuration />
      <TimeLine
        :duration="store.duration"
        :current-time="store.currentTime"
        :buffered="store.buffered"
        @seek="$emit('seek', $event)"
        @on-thumb-key="$emit('thumb', $event)"
      />
      <EnshiPlayerVolumeControl
        v-model="store.volume"
        class="EnshiPlayer-controls__btn EnshiPlayer-controls__btn--volume"
        @update:model-value="$emit('volume', $event)"
      />
      <EnshiPlayerIsPip @toggle="$emit('togglePip')" />
      <EnshiPlayerFullScreen @toggle="$emit('toggleFullscreen')" />
    </div>
  </div>
</template>

<style lang="scss">
  .EnshiPlayer-controls__footer-actions {
    display: grid;
    grid-template-columns: 125px 1fr 40px 40px 40px;
    align-items: center;
    column-gap: 30px;
    pointer-events: auto;

    @include mobile-s {
      grid-template-columns: 1fr 40px 40px;
      gap: 20px;
    }
  }

  .EnshiPlayer-controls__footer {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
</style>
