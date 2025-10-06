<script setup lang="ts">
  import { computed } from 'vue';
  import { fieldsData } from '@features/settings/config';
  import AccountAvatar from '@features/settings/ui/AccountAvatar.vue';
  import AccountFormSection from '@features/settings/ui/AccountFormSection.vue';
  import SettingsFields from '@features/settings/ui/SettingsFields.vue';
  import { useUserStore } from '@entities/user/model';
  import { client } from '@shared/api';
  import { useFormRequest } from '@shared/lib/composables/form-request';

  const userStore = useUserStore();

  const [fields, submit] = useFormRequest({
    fields: {
      nickname: userStore.user?.name ?? '',
      email: userStore.user?.email ?? '',
      // current_password: '',
      // new_password: '',
      // new_password_confirmation: '',
      avatar: userStore.user?.avatar,
      // cover: userStore.user?.cover,
    },
    submit: {
      request: async (fields) => {
        const formData = new FormData();

        const response = await client.put({
          url: 'user/settings/editor',
          payload: {
            nickname: fields.nickname,
            email: fields.email,
          },
        });
        return response;
      },
      error: Promise.reject,
      resolve: Promise.resolve,
    },
  });

  const previewAvatar = computed(() =>
    fields.avatar instanceof File ? URL.createObjectURL(fields.avatar) : fields.avatar
  );

  const handleChangeAvatar = (file: File) => {
    fields.avatar = file;
  };
</script>

<template>
  <section class="Settings container">
    <form
      class="Settings__container"
      @submit.prevent="submit"
    >
      <header class="Settings__header">
        <div class="skeleton-animation Settings__bg"></div>
        <UiImage
          class="Settings__bg"
          :src="userStore.localUser?.cover"
          error-src="/images/account_cover_example.png"
        />
        <div class="Settings__headerUser">
          <AccountAvatar
            :key="userStore.localUser?.avatar"
            :src="userStore.localUser?.avatar"
          />
          <div class="Settings__headerUserInfo">
            <p class>{{ userStore.localUser?.name }}</p>
            <p class>{{ userStore.localUser?.email }}</p>
          </div>
        </div>
        <UiButton
          w-content
          btn-type="outline"
        >
          Перейти
        </UiButton>
      </header>
      <main class="Settings__main">
        <SettingsFields
          :fields="fieldsData"
          :form="fields"
        />
        <AccountFormSection
          title="Оформление"
          subtitle="Кастомизация вашего профиля"
        >
          <div class="Settings__avatarSettings">
            <div class="Settings__avatarSettingsAvatar">
              <AccountAvatar :src="previewAvatar" />
              <UiUploadInput @file="handleChangeAvatar($event)" />
            </div>
            <div class="Settings__bgMini">
              <UiImage
                :src="userStore.localUser?.cover ?? fields.cover"
                alt="фон пользователя"
                error-src="/images/account_cover_example.png"
              />
              <UiUploadInput id="uploadBg" />
            </div>
          </div>
        </AccountFormSection>
      </main>
      <footer class="Settings__footer">
        <UiButton
          w-content
          btn-type="primary"
          type="submit"
        >
          Сохранить
        </UiButton>
      </footer>
    </form>
  </section>
</template>

<style lang="scss">
  .Settings {
    margin-top: 60px;
    margin-bottom: 60px;
    overflow: hidden;
  }

  .Settings__container {
    background-color: var(--theme-block-bg);
    border: var(--border) var(--color-white-40);
    border-radius: 20px;
    transition: border-color var(--transition-duration) ease-in-out;
    @include hover {
      .Settings__bg {
        scale: 1.07;
      }
      border-color: var(--theme-text);
    }

    &:focus-within {
      .Settings__bg {
        scale: 1.07;
      }

      border-color: var(--color-white);
    }
  }

  .Settings__header {
    padding: fluid(60, 10);
    position: relative;
    border-radius: var(--border-radius-20) var(--border-radius-20) 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: 200px;
    z-index: 1;

    .Settings__bg {
      transition: scale var(--transition-duration) ease-in-out;
      opacity: 0.3;
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .Settings__avatarSettingsAvatar {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .Settings__bgMini {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    height: fluid(160, 120);
    width: 100%;
    background-color: #2d2d2d20;

    #uploadBg {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &:empty {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed var(--color-gray-82-20);

      &:before {
        content: 'Обложка отсутствует';
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .Settings__headerUser {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .Settings__avatarSettings {
    display: flex;
    gap: 30px;
  }

  .Settings__headerUserInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;

    p {
      &:first-child {
        font-weight: 600;
        font-size: fluid(21, 18);
        line-height: fluid(26, 22);
      }

      &:last-child {
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        font-size: fluid(18, 14);
        line-height: fluid(22, 17);
      }
    }
  }

  .Settings__main {
    padding: fluid(60, 10);
  }

  .Settings__footer {
    padding: 0 fluid(60, 10) fluid(60, 10) fluid(60, 10);
    display: flex;
    justify-content: flex-end;
  }

  @media screen and (max-width: 720px) {
    .Settings__footer {
      justify-content: flex-end;

      button {
        width: 100%;
      }
    }
    .Settings__avatarSettings {
      flex-direction: column-reverse;
    }
    .Settings__avatarSettingsAvatar {
      flex-direction: row;
    }
  }
</style>
