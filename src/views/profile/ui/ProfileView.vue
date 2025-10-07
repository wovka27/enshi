<script setup lang="ts">
  import { ref } from 'vue';
  import { onBeforeRouteUpdate, useRouter } from 'vue-router';
  import { createUserProfileGuard } from '@app/router/config/guards/createUserProfileGuard.ts';
  import UserFavorites from '@features/user-favorites/ui/UserFavorites.vue';
  import UserStats from '@features/user-stats';
  import { useUserStore } from '@entities/user/model';

  const router = useRouter();
  const userStore = useUserStore();

  const activeTab = ref('favorites');

  const tabs = [{ label: 'Избранное', value: 'favorites' }];

  const logout = () => {
    userStore.logout();

    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
  };

  onBeforeRouteUpdate(createUserProfileGuard);
</script>

<template>
  <div
    v-if="userStore.user"
    class="AccountView"
  >
    <div class="AccountView__cover">
      <UiImage
        :src="userStore.user?.cover"
        error-src="/images/account_cover_example.png"
        alt="bg"
      />
    </div>
    <div class="AccountView__contentContainer container">
      <div class="AccountView__user block-container">
        <div class="AccountView__userAvatar">
          <UiImage
            width="130"
            height="130"
            :src="userStore.user?.avatar"
            alt="user"
          />
        </div>
        <div class="AccountView__userInfo">
          <p
            v-if="userStore.user?.name"
            class
            inert
          >
            {{ userStore.user?.name }}
          </p>
          <div
            v-if="userStore.user?.rank"
            inert
            class="AccountView__rank"
          >
            {{ userStore.user?.rank }}
          </div>
        </div>
        <div
          v-if="userStore.isAuthUser"
          class="AccountView__userBtns"
        >
          <div class="AccountView__userBtn AccountView__userBtn_stat block-container">
            <svg
              data-v-580a597d=""
              class="svg-inline--fa fa-chart-column"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chart-column"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                class=""
                fill="currentColor"
                d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"
              ></path>
            </svg>
          </div>
          <UiIconButton
            is-theme
            icon-name="settings"
            class="AccountView__userBtn block-container"
            @click="router.push('/user/settings')"
          />
          <UiIconButton
            is-theme
            icon-name="logout"
            @click="logout"
          />
        </div>
      </div>

      <UserStats />

      <div class="AccountView__tabsContainer block-container">
        <UiTabs
          v-if="userStore.isAuthUser"
          v-model="activeTab"
          theme="dark"
          :tabs="tabs"
        />
        <UserFavorites />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .AccountView__rank {
    color: var(--color-white);
    padding: 6px 16px;
    border-radius: 5px;
    background: linear-gradient(90deg, rgba(140, 83, 253, 1), rgba(83.55731964111328, 49.53755187988281, 151, 1) 70%);
  }
  .AccountView {
    position: relative;
    z-index: 1;
    padding-bottom: fluid(120, 60);
  }
  .AccountView__contentContainer {
    margin-top: -90px;
    display: grid;
    gap: 40px;
    grid-template-columns: 258px 1fr;
    grid-template-areas:
      'user .'
      'user tabs'
      'user tabs'
      'stats tabs'
      '. tabs';
  }
  .AccountView__user {
    background-color: var(--theme-block-bg);
    padding: 30px;
    height: fluid(359, 250);
    max-width: 100%;
    grid-area: user;
    display: flex;
    color: var(--theme-text);
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: fluid(20, 10);
  }
  .AccountView__userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    p {
      font-size: fluid(20, 18);
      line-height: fluid(24, 22);
      font-weight: 500;
    }
  }
  .AccountView__userBtns {
    display: flex;
    gap: fluid(30, 15);

    svg {
      width: 20px;
      height: auto;
      opacity: 0.3;
    }
  }
  .AccountView__favoriteList {
    display: flex;
    flex-wrap: wrap;
    padding-top: fluid(35, 20);
    gap: fluid(35, 20);
  }
  .AccountView__userBtn {
    width: 48px;
    height: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &_stat {
      display: none;
    }
    @include hover {
      border-color: #a9a9a9;
      color: white;
    }
  }
  .AccountView__userBtn {
    &.active {
      svg {
        opacity: 1;
      }
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
  .AccountView__userAvatar {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
  }
  .AccountView__tabsContainer {
    background-color: var(--theme-block-bg);

    padding: fluid(30, 20);
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 100%;
    height: 100%;
    grid-area: tabs;
  }
  .AccountView__cover {
    position: relative;
    z-index: -1;
    height: fluid(300, 390);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  @media (max-width: 950px) {
    .line {
      height: 100%;
      width: 0;
      margin: 0 30px;
    }
    .AccountView__contentContainer {
      &.is_hidden_stat {
        grid-template-areas:
          'user'
          'tabs';
      }
      grid-template-columns: 1fr;
      grid-template-areas:
        'user'
        'stats'
        'tabs';
    }
    .AccountView__user {
      height: 210px;
      flex-direction: row;
      justify-content: space-between;
    }
    .AccountView__userInfo {
      flex: 1 1 100%;
      align-items: flex-start;
    }
    .AccountView__userBtn {
      &_stat {
        display: inherit;
      }
    }
    .AccountView__StatsItem {
      height: 100%;
      width: 100%;
    }

    .AccountView__Stats {
      height: 150px;

      & > div {
        height: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  @media (max-width: 650px) {
    .AccountView__contentContainer {
    }
    .AccountView__user {
      height: 210px;
      flex-direction: row;
      justify-content: space-between;
    }

    .AccountView__userBtns {
      flex-direction: column;
    }

    .AccountView__userAvatar {
      position: relative;
      width: 100px;
      height: 100px;
    }

    .line {
      height: 0;
      width: 100%;
      margin: 30px 0;
    }

    .AccountView__Stats {
      height: inherit;

      & > div {
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
</style>
