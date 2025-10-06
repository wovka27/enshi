<template>
  <div class="error404block">
    <div class="error404block_imageblock">
      <img
        src="/images/404.webp"
        alt="Удивление аниме персонажа"
        width="270"
        height="402"
        draggable="false"
      />
    </div>
    <div class="error404block_textblock">
      <p class="error404block_textblock_404">404</p>
      <p class="error404block_textblock_text">Извините, но мы не смогли найти страницу, которую вы искали</p>
      <router-link
        class="error404block_textblock_link"
        to="/"
      >
        На главную
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
  .error404block {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 200px);

    &_imageblock {
      img {
        background-attachment: fixed;
        pointer-events: none;
      }
    }

    &_textblock {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 55px;

      &_404 {
        color: #fff;
        font-family: Montserrat;
        font-size: 75px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 6px;
        text-align: center;
      }

      &_text {
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 1.2px;
        max-width: 320px;
        margin-bottom: 42px;
      }

      &_link {
        text-decoration: none;
        color: #fff;
        font-family: Montserrat;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.26px;
        border-radius: 10px;
        padding: 12px 72px 12px 73px;
        background: #333238;
        transition: 0.3s;

        &:active,
        &:hover {
          background: #4d4d4d;
        }
      }
    }
  }

  @media (max-width: 560px) {
    .error404block {
      flex-direction: column;

      &_imageblock {
        img {
          max-width: 217px;
          max-height: 301px;
        }
      }

      &_textblock {
        margin-left: 0;
        margin-top: 25px;

        &_404 {
          font-size: 56px;
          letter-spacing: 4.48px;
          margin-bottom: 5px;
        }

        &_text {
          font-size: 12px;
          letter-spacing: 0.96px;
          max-width: 285px;
          margin-bottom: 25px;
        }

        &_link {
          font-size: 12px;
          letter-spacing: 0.24px;
          border-radius: 7.5px;
          padding: 12px 48px 13px 47px;
        }
      }
    }
  }
</style>
