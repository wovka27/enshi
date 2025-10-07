<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { IComment } from '@entities/anime-comment/model';
  import TextEditor from '@entities/text-editor/ui/TextEditor.vue';
  import { declension } from '@shared/lib/utils';

  interface IAnimeCommentProps {
    data: IComment;
    commentId?: number;
    sendAnswer: (comment_id: number, answer: string) => Promise<void>;
  }

  const props = defineProps<IAnimeCommentProps>();

  const input = ref('');
  const is_show_comment_input = ref<boolean>(false);
  const is_show_answer_comments = ref<boolean>(false);
  const answers_count_text = computed(() =>
    declension(props.data?.answers?.length ?? 0, ['ответ', 'ответа', 'ответов'])
  );

  const showCommentInput = (name: string) => {
    input.value = name + ', ';
    is_show_comment_input.value = !is_show_comment_input.value;
  };

  const click = (comment_id: number, answer: string) => {
    props.sendAnswer(comment_id, answer).then(() => {
      input.value = '';
      is_show_comment_input.value = false;
    });
  };
</script>

<template>
  <div class="AnimeComment AnimeComment--root">
    <div
      :id="`comment_${data.id}`"
      class="AnimeComment__Avatar"
    >
      <router-link
        :to="{ name: 'profile', params: { id: data.user_id } }"
        class="AnimeComment__img"
      >
        <UiImage
          width="56"
          height="56"
          :src="data.user.avatar || ''"
          error-src="/images/AvatarExample.png"
        />
      </router-link>
      <i></i>
    </div>
    <div class="AnimeComment__content">
      <div class="AnimeComment__header">
        <div class="AnimeComment__headerRankName">
          <div inert>
            {{ data.user.rank }}
          </div>
          <p>{{ data.user.name }}</p>
        </div>
        <div class="AnimeComment__createdAgo">{{ data.created_at_ago }}</div>
      </div>
      <div class="AnimeComment__desc">{{ data.comment ?? data.answer }}</div>
      <button
        class="AnimeComment__btn"
        @click="showCommentInput(data.user.name)"
      >
        {{ is_show_comment_input ? 'Отменить' : 'Ответить' }}
      </button>
      <transition name="list">
        <div
          v-if="is_show_comment_input"
          class="AnimeComment__answer-field"
        >
          <TextEditor
            v-model="input"
            size="small"
            @send="click(data.id, input)"
          />
        </div>
      </transition>
      <transition-group name="list">
        <div
          v-if="data.answers?.length"
          class="AnimeComment__showedComment"
        >
          <p
            v-if="!is_show_answer_comments"
            class="AnimeComment__showedCommentP"
            @click="is_show_answer_comments = !is_show_answer_comments"
          >
            <svg
              data-v-287280a6=""
              class="svg-inline--fa fa-reply"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="reply"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"
              ></path>
            </svg>
            &nbsp;Показать {{ data.answers.length }}&nbsp;{{ answers_count_text }}
          </p>

          <template v-else>
            <AnimeComment
              v-for="item of data.answers"
              :key="item.id"
              :send-answer="sendAnswer"
              :comment_id="data.id"
              :data="item"
            />
          </template>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss">
  .AnimeComment {
    color: var(--theme-text);
    width: inherit;
    display: flex;
    gap: fluid(20, 10);
    height: inherit;
    padding-bottom: 20px;

    &.AnimeComment--root &:last-child {
      &:has(.AnimeComment__answer-field) i {
        display: initial;
      }
      & i {
        display: none;
      }
    }
  }

  .AnimeComment__img {
    position: relative;
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
    max-width: 700px;
    flex-grow: 1;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .AnimeComment__headerRankName {
    & > div {
      color: var(--color-white);
      padding: 6px 16px;
      border-radius: 5px;
      background: linear-gradient(90deg, rgba(140, 83, 253, 1), rgba(83.55731964111328, 49.53755187988281, 151, 1) 70%);
    }
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
    color: var(--color-gray-82);
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

  .AnimeComment__answer-field {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-bottom: 20px;
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
    transition: all 0.3s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
