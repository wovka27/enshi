<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useRegisterForm } from '@features/register-form/lib/register-form';
  import { toast } from '@entities/app-toast/lib';
  import authService from '@entities/auth/model/auth.service.ts';

  const router = useRouter();
  const form = useRegisterForm();

  const email = form.defineField('email');
  const password = form.defineField('password');
  const name = form.defineField('name');
  const confirmPassword = form.defineField('password_confirmation');

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await authService.register(values);

    if (!response.ok && response.data?.data?.errors) {
      form.setErrors(
        Object.entries(response.data?.data?.errors || {}).reduce((acc, [k, v]) => {
          const value = Array.isArray(v) ? v[0] : v;
          return {
            ...acc,
            [k]: value,
            ...(k === 'password' && { password_confirmation: value }),
          };
        }, {})
      );

      throw Promise.reject;
    }

    if (response.ok && response.data.data.send_email) {
      await authService.sendVerify({
        email: email.value.value,
        message_type: 'email',
      });

      await router.push('/confirm-code');

      toast({
        title: 'Успех',
        text: response.data.message,
        type: 'success',
      });
    }

    // user.setUser(response.data!.data.user);
    // user.setToken(response.data!.data.access_token);
  });
</script>

<template>
  <form
    class="Register"
    @submit.prevent="onSubmit"
  >
    <UiInput
      v-model="name.value.value"
      autocomplete="false"
      :error="name.errorMessage.value"
      icon="profile"
      @on-input="name.onInput"
      @on-blur="name.onBlur"
    />
    <UiInput
      v-model="email.value.value"
      :error="email.errorMessage.value"
      type="email"
      icon="mail"
      @on-input="email.onInput"
      @on-blur="email.onBlur"
    />
    <UiInput
      v-model="password.value.value"
      :error="password.errorMessage.value"
      type="password"
      icon="password"
      @on-input="password.onInput"
      @on-blur="password.onBlur"
    />

    <UiInput
      v-model="confirmPassword.value.value"
      autocomplete="false"
      :error="confirmPassword.errorMessage.value"
      icon="password"
      type="password"
      @on-input="confirmPassword.onInput"
      @on-blur="confirmPassword.onBlur"
    />

    <div style="display: flex; flex-direction: column; gap: 20px">
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

      <p class="docs">
        Нажимая кнопку, вы&nbsp;принимаете
        <br />
        <router-link
          style="display: contents"
          to="/agreement"
        >
          &laquo;пользовательское соглашение&raquo;
        </router-link>
        &nbsp;и&nbsp;
        <router-link
          style="display: contents"
          to="/policy"
        >
          &laquo;политику
          <br />
          конфиденциальности&raquo;
        </router-link>
      </p>
    </div>

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
  .Register {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: fluid(30, 20);
  }

  .docs {
    text-align: left;
    font-size: 14px;
    color: var(--color-gray-b1);
    a {
      color: var(--color-gray-f5);
    }
  }
</style>
