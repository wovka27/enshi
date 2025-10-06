<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useLoginForm } from '@features/login-form/lib/login-form';
  import { toast } from '@entities/app-toast/lib';
  import authService from '@entities/auth/model/auth.service.ts';
  import { useUserStore } from '@entities/user/model';

  const router = useRouter();
  const form = useLoginForm();
  const user = useUserStore();

  const email = form.defineField('email');
  const password = form.defineField('password');

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await authService.login(values);

    if (!response.ok && response.data?.message) {
      toast({
        title: 'Авторизация',
        text: response.data?.message,
        type: response.data?.success ? 'success' : 'error',
        timeout: 5000,
      });

      throw Promise.reject(response.data?.message);
    }

    if (!response.ok && response.data?.data?.send_email) {
      await authService.sendVerify({
        email: email.value.value,
        message_type: 'email',
      });
      await router.push({ name: 'confirm-code', query: { email: email.value.value, message_type: 'email' } });
    }

    if (response.ok && response.data.success) {
      user.setUser(response.data.data.user);
      user.setToken(response.data.data.access_token);

      if (router.currentRoute.value.query?.redirect) {
        await router.replace(router.currentRoute.value.query.redirect as string);
      } else {
        await router.replace({ name: 'home' });
      }
    }
  });
</script>

<template>
  <form
    class="Login"
    @submit.prevent="onSubmit"
  >
    <UiInput
      v-model="email.value.value"
      autocomplete="false"
      :error="email.errorMessage.value"
      icon="profile"
      @on-input="email.onInput"
      @on-blur="email.onBlur"
    />
    <div style="display: flex; align-items: end; flex-direction: column; gap: 12px">
      <UiInput
        v-model="password.value.value"
        :error="password.errorMessage.value"
        type="password"
        autocomplete="false"
        icon="password"
        @on-input="password.onInput"
        @on-blur="password.onBlur"
      />
      <router-link
        style="font-size: 16px; font-weight: 400; color: var(--color-purple-b0)"
        to="/recovery-password"
      >
        Забыли пароль?
      </router-link>
    </div>
    <UiButton
      :disabled="form.isSubmitting.value"
      type="submit"
      btn-type="primary"
    >
      Войти
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
      <p style="color: #505050">
        Нет аккаунта?
        <router-link
          style="color: var(--color-gray-b1)"
          to="/register"
        >
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </form>
</template>

<style lang="scss">
  .Login {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
</style>
