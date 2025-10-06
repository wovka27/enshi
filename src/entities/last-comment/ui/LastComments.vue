<script setup lang="ts">
  import { useLastCommentStore } from '@entities/last-comment/model/last-comment.store.ts';
  import LastCommentsList from '@entities/last-comment/ui/LastCommentsList.vue';

  const lastCommentStore = useLastCommentStore();

  lastCommentStore.getData();
</script>

<template>
  <section
    v-if="lastCommentStore.list.length"
    id="last_comments"
    class="container"
  >
    <div class="LastComments">
      <div class="LastComments__container">
        <div class="LastComments__innerWrap">
          <h3>Последние комментарии</h3>
          <LastCommentsList :data="lastCommentStore.list" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass">
  .LastComments__container
    padding: 20px 71px 40px 30%
    box-sizing: border-box

  .LastComments
    box-sizing: border-box
    width: 100%
    min-height: 593px
    margin-bottom: 114px
    border-radius: var(--border-radius-10)
    background: var(--theme-block-bg) url(/images/pngwing.png) no-repeat left bottom
    background-size: 50% / cover

  .LastComments__innerWrap
    display: grid
    grid-template-columns: 1fr
    gap: 30px
    box-sizing: border-box

    h3
      color: var(--theme-text)
      font-family: Montserrat
      font-size: 24px
      font-weight: 600
      line-height: 29px
      letter-spacing: 0
      text-align: center
      box-sizing: border-box

  @media (max-width: 970px)
    .LastComments
      background-image: none
    .LastComments__container
      padding: 30px
</style>
