<template>
  <div class="ReleaseTodayPosterBg">
    <span
      v-for="i in 50"
      :key="i"
      class="particle"
    ></span>
  </div>
</template>

<style lang="scss">
  .ReleaseTodayPosterBg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    background: var(--color-dark-1f);

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      height: 60%;
      background: linear-gradient(
        to top,
        rgba(140, 83, 253, 0.5) 0%,
        rgba(140, 83, 253, 0.3) 25%,
        rgba(140, 83, 253, 0.2) 45%,
        rgba(140, 83, 253, 0.1) 55%,
        rgba(140, 83, 253, 0) 100%
      );
      clip-path: ellipse(80% 100% at 50% 100%);
      animation: wave 12s linear infinite;
    }

    .particle {
      position: absolute;
      bottom: -10px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      animation: rise linear infinite;
      filter: blur(1px);

      @for $i from 1 through 50 {
        &:nth-child(#{$i}) {
          left: random(100) * 1%;
          width: random(3) * 1px + 1px;
          height: random(3) * 1px + 1px;
          opacity: random(10) / 10;
          animation-duration: (random(5) + 3) * 1s;
          animation-delay: random(5) * -1s;
        }
      }
    }
  }

  @keyframes rise {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) scale(0.5);
      opacity: 0;
    }
  }

  @keyframes wave {
    to {
      transform: translateX(-50%);
    }
  }
</style>
