<script setup lang="ts">
  import { computed, nextTick, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import UiIconSelect from '@shared/ui/ui-icon-select/ui/UiIconSelect.vue';

  const animeDetailStore = useAnimeDetailStore();
  const route = useRoute();

  const handleUpdate = async (value: string) => {
    animeDetailStore.setSelectedVoiceType(value);
    await animeDetailStore.getEpisodes(+route.params.id as number, +value);
  };

  const isShow = computed(() => animeDetailStore.voices.length && animeDetailStore.selectedPlayerType === 'enshi');

  watch(
    [() => animeDetailStore.selectedPlayerType, () => animeDetailStore.voices],
    async ([playerType, voices]) => {
      if (playerType === 'enshi') {
        if (!voices.length) {
          await animeDetailStore.getVoices(route.params.id as number);
        }
        await nextTick(async () => {
          if (!animeDetailStore.selectedVoiceType && voices.length) {
            await handleUpdate(animeDetailStore.voices[0].value);
          }
        });
      }
    },
    { deep: true, immediate: true }
  );
</script>

<template>
  <UiIconSelect
    v-if="isShow"
    :model-value="animeDetailStore.selectedVoiceType"
    icon="voice"
    :options="animeDetailStore.voices"
    @update:model-value="handleUpdate"
  />
</template>

<style lang="scss"></style>
