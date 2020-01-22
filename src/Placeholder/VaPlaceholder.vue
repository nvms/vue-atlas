<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaPlaceholder',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObj () {
      const { rounded, centered, animated } = this
      const classes = {}

      classes['va-placeholder'] = true
      classes['va-placeholder-rounded'] = rounded
      classes['va-placeholder-centered'] = centered
      classes['va-placeholder-animated'] = animated

      return classes
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

$placeholderLineHeight: 15px;
$placeholderLineSpacing: 10px;
$placeholderPrimaryColor: $N20;
$placeholderAnimationColor: $N0;
$placeholderSecondaryColor: $N40;
$placeholderRoundedRadius: 3px;
@keyframes placeholderAnimation {
  0% {
    transform: translate3d(-30%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

.va-placeholder {
  position: relative;
  overflow: hidden;
  max-width: 100%;
  &-rounded * {
    border-radius: $placeholderRoundedRadius;
  }
  &-centered {
    margin-left: auto;
    margin-right: auto;
  }
  &-animated {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      max-width: 1800px;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        $placeholderAnimationColor 15%,
        transparent 30%
      );
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeholderAnimation;
      animation-timing-function: linear;
    }
  }
  &-text {
    &-line {
      &:last-child {
        margin-bottom: 25px;
      }
      height: $placeholderLineHeight;
      margin-bottom: $placeholderLineSpacing;
      background: $placeholderPrimaryColor;
      &:nth-child(4) {
        width: 85%;
      }
      &:nth-child(5) {
        width: 60%;
      }
      &:nth-child(6) {
        width: 70%;
      }
      &:nth-child(7) {
        width: 80%;
      }
    }
  }
  &-heading {
    display: flex;
    &-image {
      background: $placeholderPrimaryColor;
      width: 2 * $placeholderLineHeight + $placeholderLineSpacing;
      height: 2 * $placeholderLineHeight + $placeholderLineSpacing;
      margin-right: 1.5 * $placeholderLineSpacing;
    }
    &-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-title {
        width: 85%;
        margin-bottom: $placeholderLineSpacing;
        background: $placeholderPrimaryColor;
        height: $placeholderLineHeight;
      }
      &-subtitle {
        width: 90%;
        margin-bottom: $placeholderLineSpacing;
        background: $placeholderPrimaryColor;
        height: $placeholderLineHeight;
      }
    }
  }
}
</style>
