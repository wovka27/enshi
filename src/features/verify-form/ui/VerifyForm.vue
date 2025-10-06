<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useVerifyForm } from '@features/verify-form/lib/login-form';
  import authService from '@entities/auth/model/auth.service.ts';
  import { useUserStore } from '@entities/user/model';

  const router = useRouter();
  const form = useVerifyForm();
  const user = useUserStore();

  const code = form.defineField('code');

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await authService.verify({
      code: values.code,
      email: router.currentRoute.value.query.email as string,
      message_type: router.currentRoute.value.query.message_type as 'email' | 'password',
    });

    if (response.ok) {
      user.setUser(response.data.data.user);
      user.setToken(response.data.data.access_token);

      const redirect = router.currentRoute.value.query.redirect as string;

      if (redirect) {
        await router.replace(redirect);
        return;
      }

      await router.replace('/');
    }
  });
</script>

<template>
  <form
    class="Verify"
    @submit.prevent="onSubmit"
  >
    <UiInput
      v-model="code.value.value"
      :error="code.errorMessage.value"
      icon="profile"
      @on-input="code.onInput"
      @on-blur="code.onBlur"
    />

    <UiButton
      :disabled="form.isSubmitting.value"
      type="submit"
      btn-type="primary"
    >
      Отправить
      <svg
        viewBox="0 0 22 17.0078"
        xmlns="http://www.w3.org/2000/svg"
        width="22.000000"
        height="17.007812"
        fill="none"
        customFrame="#000000"
      >
        <path
          id="Vector"
          d="M7.5 20L7.5 0M0 7.5L7.5 0L15 7.5"
          fill-rule="nonzero"
          stroke="rgb(255,255,255)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          transform="matrix(6.12323e-17,1,-1,6.12323e-17,21,1.00391)"
        />
      </svg>
    </UiButton>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding-top: 22px;
        border-top: 1px solid var(--color-gray-82);
      "
    >
      <p style="color: var(--color-gray-82)">
        Уже есть аккаунт?
        <router-link
          style="color: var(--color-gray-f5)"
          to="/login"
        >
          Авторизация
        </router-link>
      </p>
    </div>
  </form>
</template>

<style lang="scss">
  .Verify {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
</style>
