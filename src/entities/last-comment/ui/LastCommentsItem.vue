<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { ILastCommentsListItem } from '@entities/last-comment/model/last-comment.types.ts';

  interface ILastCommentsItemProps {
    data: ILastCommentsListItem;
  }
  defineProps<ILastCommentsItemProps>();

  const router = useRouter();
</script>

<template>
  <article
    class="LastComments__item"
    @click="
      router.push({
        name: 'anime_page',
        params: { id: data.anime.id },
        hash: `#comment_${data.id}`,
      })
    "
  >
    <header>
      <div
        class="LastComments__itemHeaderWrap"
        @click.stop="router.push({ name: 'profile', params: { id: data.user_id } })"
      >
        <picture class="LastComments__itemAvatar">
          <UiImage
            :src="data.user.avatar"
            :alt="'avatar ' + data.user.name"
            error-src="/images/AvatarExample.png"
          />
        </picture>
        <div class="LastComments__itemUser">
          <p class="LastComments__itemUserName">{{ data.user.name }}</p>
          <p class="LastComments__itemUserCreatedAgo">{{ data.created_at_ago }}</p>
        </div>
      </div>
      <p class="LastComments__itemUserComment">{{ data.comment }}</p>
    </header>
    <footer @click.stop="router.push({ name: 'anime_page', params: { id: data.anime.id } })">
      <UiIcon
        width="25"
        name="film"
      />
      <p class="LastComments__itemUserAnimeTitle">{{ data.anime.title }}</p>
    </footer>
  </article>
</template>

<style lang="sass">
  @use 'sass:color'

  .LastComments__item
    color: var(--theme-text)
    min-height: clamp(192px, 35vw, 217px)
    width: clamp(220px, 35vw, 240px)
    cursor: pointer
    padding: 20px
    align-self: stretch
    box-sizing: border-box
    display: flex
    flex-direction: column
    justify-content: space-between
    border-radius: 20px
    background: var(--theme-item-bg)
    transition: scale .2s ease-in-out
    will-change: transform

    &:hover
      scale: 1.02

    .LastComments__itemHeaderWrap
      display: flex
      gap: 20px
      box-sizing: border-box
      align-items: center
      margin-bottom: 14px

    footer
      color: rgb(176, 137, 255)
      display: flex
      gap: 11.5px
      box-sizing: border-box
      align-items: center
      transition: all .2s ease-in-out

      &:hover
        p
          color: color.adjust(rgb(176, 137, 255), $lightness: 10%)

        svg path
          stroke: color.adjust(rgb(176, 137, 255), $lightness: 10%)

      svg
        flex-shrink: 0

        path
          transition: all .2s ease-in-out

      p
        transition: all .2s ease-in-out
        color: rgb(176, 137, 255)

    main
      box-sizing: border-box

      p
        color: var(--theme-text)
        font-family: Montserrat
        font-size: 14px
        font-weight: 500
        box-sizing: border-box
        line-height: 17px
        letter-spacing: 0
        text-align: left

  .LastComments__itemAvatar
    position: relative
    box-sizing: border-box
    width: 44px
    height: 44px
    border-radius: 5px
    overflow: hidden

    img
      width: 100%
      height: 100%
      box-sizing: border-box
      object-fit: cover
      object-position: center

  .LastComments__itemUser
    box-sizing: border-box

    .LastComments__itemUserName
      color: var(--theme-text)
      font-family: Montserrat
      font-size: 16px
      box-sizing: border-box
      font-weight: 600
      line-height: 20px
      letter-spacing: 0

    .LastComments__itemUserCreatedAgo
      color: rgb(130, 130, 130)
      font-family: Montserrat
      box-sizing: border-box
      font-size: 12px
      font-weight: 500
      line-height: 15px
      letter-spacing: 0

  .LastComments__itemUserComment
    width: 100%
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    box-sizing: border-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    color: var(--theme-text)
    font-size: 14px
    font-weight: 500
    line-height: 17px
    letter-spacing: 0
    text-align: left

  .LastComments__itemUserAnimeTitle
    overflow: hidden
    text-overflow: ellipsis
    box-sizing: border-box
    display: -webkit-box
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical

  @media (max-width: 499px)

    .LastComments__itemUserComment, .LastComments__itemUserAnimeTitle
      font-size: 12px
      line-height: 15px

    .LastComments__itemUserName
      font-size: 14px

    .LastComments__itemUserCreatedAgo
      font-size: 10.8px
      line-height: 13px
</style>
