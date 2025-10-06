<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AnimeComment from '@entities/anime-comment/ui/AnimeComment.vue';
  import { useAnimeDetailStore } from '@entities/anime-detail/model';
  import TextEditor from '@entities/text-editor/ui/TextEditor.vue';

  const route = useRoute();
  const animeDetailStore = useAnimeDetailStore();

  const showMore = async () => {
    animeDetailStore.setCommentPagination('current_page', animeDetailStore.comments.pagination.current_page + 1);
    await animeDetailStore.getMoreComments(
      route.params.id as string,
      animeDetailStore.comments.pagination.current_page
    );
  };

  const a = ref('');

  const sendComment = async () => {
    await animeDetailStore.createComment(animeDetailStore.data!.id!, a.value);
    await animeDetailStore.getComments(animeDetailStore.data!.id);
  };
  const sendAnswer = async (id: number, answer: string) => {
    await animeDetailStore.createAnswer(id, answer);
  };
</script>

<template>
  <div class="AddComment container">
    <h3 class="AddComment__title">
      Комментарии
      <span>({{ animeDetailStore.comments.count }})</span>
    </h3>
    <div style="display: flex; align-items: flex-end; flex-direction: column; margin-bottom: 35px">
      <TextEditor
        v-model="a"
        placeholder="Написать комментарий..."
        @send="sendComment"
      />
    </div>
    <transition-group
      name="list"
      tag="div"
      style="display: flex; flex-direction: column; gap: 15px; width: 100%; height: 100%"
    >
      <AnimeComment
        v-for="item of animeDetailStore.comments.data"
        :key="item.id"
        :send-answer="sendAnswer"
        :data="item"
      />
    </transition-group>

    <div
      v-if="animeDetailStore.comments.pagination.has_more_pages"
      style="display: flex; justify-content: center"
    >
      <UiButton
        w-content
        btn-type="primary"
        @click="showMore"
      >
        Показать еще
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss">
  .AddComment {
    margin-bottom: fluid(160, 60);
  }

  .AddComment__title {
    font-size: fluid(24, 20);
    font-weight: 600;
    color: var(--theme-text);
    span {
      color: var(--color-gray-82);
    }

    margin-bottom: 34px;
  }
  .AnimeComment {
    width: inherit;
    display: flex;
    gap: fluid(20, 10);
    height: inherit;
    padding-bottom: 20px;
  }

  .AnimeComment__img {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .AnimeComment__Avatar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    i {
      height: 100%;
      width: 2px;
      background: rgb(130, 130, 130);
    }
  }

  .AnimeComment__desc {
    font-size: fluid(16, 12);
  }

  .AnimeComment__btn {
    color: rgb(130, 130, 130);
    outline: none;
    border: none;
    font-size: 14px;
    max-width: max-content;
    background: transparent;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .AnimeComment__content {
    flex-grow: 1;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .AnimeComment__header,
  .AnimeComment__headerRankName {
    display: flex;
    gap: fluid(10, 5);
    align-items: center;

    p {
      font-size: fluid(20, 16);
      font-weight: 500;
    }
  }

  .AnimeComment__createdAgo {
    font-size: 12px;
    color: rgb(130, 130, 130);
  }

  .AnimeComment__showedComment {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > p {
      cursor: pointer;
    }

    height: max-content;
  }

  .AnimeComment__showedCommentP {
    color: #c8a4ff;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    display: flex;

    svg {
      width: 15px;
    }
  }

  @media screen and (max-width: 720px) {
    .AnimeComment__content {
      padding-top: 0;
    }
    .AnimeComment__header {
      align-items: flex-start;
    }
    .AnimeComment__headerRankName {
      flex-direction: column-reverse;
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all var(--transition-duration) ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
