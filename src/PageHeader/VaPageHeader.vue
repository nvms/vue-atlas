<template>
    <div :class="`${classPrefix}-page-header`">

        <div v-if="hasBreadcrumb" :class="`${classPrefix}-page-header-breadcrumb-wrapper`">
            <div :class="`${classPrefix}-page-header-breadcrumb-container`">
                <slot name="breadcrumb">&nbsp;</slot>
            </div>
        </div>

        <div :class="`${classPrefix}-page-header-title-wrapper`">
            <div :class="`${classPrefix}-page-header-title-container`">
                <h1>
                    <slot name="title"></slot>
                </h1>
                <h2 v-if="hasSubtitle">
                    <slot name="subtitle"></slot>
                </h2>
            </div>

            <div v-if="hasActions" :class="`${classPrefix}-page-header-actions-wrapper`">
                <slot name="actions"></slot>
            </div>
        </div>

        <div v-if="hasBottom" :class="`${classPrefix}-page-header-bottom-wrapper`">
            <slot name="bottom">&nbsp;</slot>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'VaPageHeader',
    props: {
      classPrefix: {
        type: String,
        default: 'va'
      }
    },
    computed: {
      hasActions() {
        return !!this.$slots['actions']
      },
      hasBottom() {
        return !!this.$slots['bottom']
      },
      hasBreadcrumb() {
        return !!this.$slots['breadcrumb']
      },
      hasSubtitle() {
        return !!this.$slots['subtitle']
      }
    }
  }
</script>
