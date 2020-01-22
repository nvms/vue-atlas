<template>
  <div class="va-page-header">
    <div
      v-if="hasBreadcrumb"
      class="va-page-header-breadcrumb-wrapper"
    >
      <div class="va-page-header-breadcrumb-container">
        <slot name="breadcrumb">&nbsp;</slot>
      </div>
    </div>

    <div class="va-page-header-title-wrapper">
      <div class="va-page-header-title-container">
        <h1>
          <slot name="title"/>
        </h1>
        <h2 v-if="hasSubtitle">
          <slot name="subtitle"/>
        </h2>
      </div>

      <div
        v-if="hasActions"
        class="va-page-header-actions-wrapper"
      >
        <slot name="actions"/>
      </div>
    </div>

    <div v-if="hasBottom" class="va-page-header-bottom-wrapper">
      <slot name="bottom">&nbsp;</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaPageHeader',
  computed: {
    hasActions () {
      return !!this.$slots['actions']
    },
    hasBottom () {
      return !!this.$slots['bottom']
    },
    hasBreadcrumb () {
      return !!this.$slots['breadcrumb']
    },
    hasSubtitle () {
      return !!this.$slots['subtitle']
    }
  }
}
</script>

<style lang="scss">
.va-page-header {
  margin-top: 24px;
  margin-bottom: 16px;

  /* TITLE */
  &-title-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &-title-container {
    width: 100%;
    flex-shrink: 1;
    min-width: 0;

    h1 {
      font-weight: 500;
      font-size: 2em;
      font-style: inherit;
      letter-spacing: -0.01em;
      line-height: 32px;
      margin-top: 0;
      margin-bottom: 8px;
    }

    h2 {
      font-weight: 300;
      font-size: 1.15em;
      font-style: inherit;
      letter-spacing: -0.01em;
      line-height: 22.5px;
      margin-top: 0;
      margin-bottom: 8px;
    }
  }

  /* ACTIONS */
  &-actions-wrapper {
    white-space: nowrap;
    padding-left: 32px;
    min-width: 0;
    flex-shrink: 0;

    & > div {
      & > * {
        margin-left: 6px;
      }
    }
  }

  &-breadcrumb-container {
    display: flex;
    flex-wrap: wrap;
  }

  &-bottom-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-top: 16px;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;

      & > * {
        margin-right: 6px;
      }
    }
  }
}
</style>
