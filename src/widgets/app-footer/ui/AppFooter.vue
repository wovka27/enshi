<script setup lang="ts">
  import AppFooterCopyright from '@widgets/app-footer/ui/AppFooterCopyright.vue';
</script>

<template>
  <section class="footer">
    <div class="footer-inner-wrapper container">
      <div class="footer-logo">
        <UiLogo id="enshi_logo" />
        <UiLogoName
          id="enshi_logo2"
          :font-size="18"
          size="small"
        />
        <AppFooterCopyright />
      </div>
      <div class="footer__social">
        <a
          href="https://vk.com/enshi"
          target="_blank"
        >
          <svg
            width="31.058594"
            height="20.705811"
            viewBox="0 0 31.0586 20.7058"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M30.32 1.43C30.55 0.62 30.32 0.03 29.3 0.03L25.91 0.03C25.06 0.03 24.67 0.55 24.44 1.1C24.44 1.1 22.69 5.82 20.26 8.87C19.47 9.76 19.11 10.05 18.68 10.05C18.45 10.05 18.15 9.76 18.15 8.95L18.15 1.39C18.15 0.44 17.89 0 17.16 0L11.84 0C11.31 0 10.98 0.44 10.98 0.88C10.98 1.8 12.2 2.02 12.33 4.6L12.33 10.2C12.33 11.42 12.13 11.64 11.7 11.64C10.55 11.64 7.76 6.89 6.08 1.47C5.75 0.4 5.42 0 4.57 0L1.15 0C0.16 0 0 0.51 0 1.06C0 2.06 1.15 7.07 5.36 13.7C8.15 18.23 12.13 20.66 15.72 20.66C17.89 20.66 18.15 20.11 18.15 19.19L18.15 15.76C18.15 14.66 18.35 14.47 19.04 14.47C19.53 14.47 20.42 14.77 22.43 16.94C24.73 19.52 25.13 20.7 26.41 20.7L29.8 20.7C30.78 20.7 31.24 20.15 30.98 19.08C30.69 18.01 29.57 16.46 28.12 14.62C27.33 13.59 26.15 12.45 25.78 11.9C25.29 11.16 25.42 10.86 25.78 10.2C25.75 10.2 29.9 3.64 30.32 1.43L30.32 1.43Z"
              fill="#FFFFFF"
              fill-opacity="1.000000"
              fill-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <a
        href="https://vk.com/im?media=&sel=-168163353"
        target="_blank"
        class="footer__support"
      >
        Связаться с нами
      </a>
    </div>
  </section>
</template>

<style lang="scss">
  @use 'sass:color';

  .footer {
    background: var(--color-dark-16);
    border: var(--border) var(--color-gray-82-20);
    border-radius: fluid(50, 0) fluid(50, 0) 0 0;
    padding: 20px 50px;

    .footer-inner-wrapper {
      display: flex;
      align-items: center;
      margin-inline: auto;
      justify-content: space-between;
    }

    &__support {
      display: block;
      padding: 10.5px 30px;
      box-sizing: border-box;
      border: 1px solid #fff;
      border-radius: 10px;
      text-decoration: none;
      color: white;
      text-align: center;
      width: max-content;
      transition: border-color 0.2s ease-in-out;

      &:hover {
        border-color: color.adjust(#fff, $lightness: -25%);
      }
    }

    &-logo {
      display: grid;
      grid-template-columns: 58px 1fr;
      grid-template-areas:
        'a b'
        'a c';
      align-items: center;
      width: max-content;
      max-width: 195px;
      gap: 2px 16px;

      #enshi_logo {
        grid-area: a;
      }

      #enshi_logo2 {
        grid-area: b;
        margin-top: 8px;
      }

      p {
        margin-bottom: 3px;
        color: rgb(130, 130, 130);
        font-family: Montserrat;
        font-size: 16px;
        grid-area: c;
        font-weight: 600;
        line-height: 130%;
        letter-spacing: 0;
        text-align: left;
      }
    }

    &__social {
      display: flex;
      gap: 50px;
      justify-content: center;
      align-items: center;

      [inert] {
        svg path {
          fill: color.adjust(#fff, $lightness: -50%);
        }
      }

      a {
        svg path {
          transition: fill 0.2s ease-in-out;
        }

        &:hover {
          svg path {
            fill: color.adjust(#fff, $lightness: -25%);
          }
        }
      }
    }

    @media (max-width: 720px) {
      padding: 44px 48px;

      .footer-inner-wrapper {
        width: 100%;
        flex-direction: column;
        gap: 30px;
        margin: 0;
      }

      &__social {
        order: 1;
      }

      &-logo {
        width: 100%;
        max-width: 100%;
        grid-template-areas:
          'b a'
          'c a';
        grid-template-columns: repeat(2, 1fr);
        order: 3;
        padding-top: 30px;
        border-top: 3px solid rgba(130, 130, 130, 0.2);

        #enshi_logo {
          justify-self: end;
        }
      }

      &__support {
        width: 100%;
        order: 2;
      }
    }
  }
</style>
