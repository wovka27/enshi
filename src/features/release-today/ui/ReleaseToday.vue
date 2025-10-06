<script setup lang="ts">
  import { computed } from 'vue';
  import { useReleaseTodayStore } from '@entities/release-today/model';
  import ReleaseTodayCardItem from '@entities/release-today/ui/ReleaseTodayCardItem.vue';
  import ReleaseTodayPosterBg from '@entities/release-today/ui/ReleaseTodayPosterBg.vue';
  import ReleaseTodayPosterItem from '@entities/release-today/ui/ReleaseTodayPosterItem.vue';

  const releaseTodayStore = useReleaseTodayStore();

  const posters = computed<typeof releaseTodayStore.list>(() =>
    [...releaseTodayStore.list, ...Array(6).fill({ id: null })].slice(0, 6)
  );

  releaseTodayStore.getData();
</script>

<template>
  <section
    v-if="releaseTodayStore.list.length"
    class="container"
  >
    <div class="ReleaseToday">
      <h3 class="ReleaseToday__h3">Сегодня&nbsp;выйдет</h3>
      <div class="ReleaseToday__posters">
        <div class="ReleaseToday__postersBgWrap">
          <ReleaseTodayPosterBg />
        </div>
        <div class="ReleaseToday__postersList">
          <ReleaseTodayPosterItem
            v-for="(item, idx) of posters"
            :key="idx"
            :data="item"
          />
        </div>
      </div>
      <div class="ReleaseToday__itemList">
        <ReleaseTodayCardItem
          v-for="(i, idx) of releaseTodayStore.list"
          :key="idx"
          :data="i"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .ReleaseToday {
    color: var(--theme-text);
    border-radius: 10px;
    background: var(--theme-block-bg);
    margin: 0 0 114px;
    min-height: 600px;
    position: relative;

    h3 {
      z-index: 1;
      position: absolute;
      top: 30px;
      left: 50%;
      color: var(--color-white);
      transform: translateX(-50%);
      font-size: 38px;
      font-weight: 600;
      line-height: 46px;
      text-align: left;
    }
  }

  .ReleaseToday__posters {
    position: relative;
    overflow: hidden;
    height: clamp(231px, 45vw, 280px);
    border-radius: var(--border-radius-10) var(--border-radius-10) var(--border-radius-60) var(--border-radius-60);
  }

  .ReleaseToday__postersBgWrap {
    position: absolute;
    background-color: var(--color-dark-1f);
    z-index: 0;
    inset: 0;
  }

  .ReleaseToday__postersList {
    padding: 40px 30px 0 30px;
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  .ReleaseToday__itemList {
    padding: 40px 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }

  @media (max-width: 1000px) {
    .ReleaseToday__postersList {
      padding: 40px 0 0;
      margin: 0 -5%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      justify-content: space-between;
    }
  }

  @media (max-width: 689px) {
    .ReleaseToday__postersList {
      height: 100%;
      margin: 0 -3%;
      grid-template-columns: repeat(3, 1fr);
    }

    .ReleaseToday {
      h3 {
        font-size: 21px;
        line-height: 26px;
      }
    }

    .ReleaseToday__itemList {
      padding: 25px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }

  @media (max-width: 499px) {
    .ReleaseToday__postersList {
      margin: 0 -5%;
    }
  }
</style>
