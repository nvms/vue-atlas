<template>
    <div :class="`${prefixCls}-page-header`">

        <div v-if="hasBreadcrumb" :class="`${prefixCls}-page-header-breadcrumb-wrapper`">
            <div :class="`${prefixCls}-page-header-breadcrumb-container`">
                <slot name="breadcrumb">&nbsp;</slot>
            </div>
        </div>

        <div :class="`${prefixCls}-page-header-title-wrapper`">
            <div :class="`${prefixCls}-page-header-title-container`">
                <h1>
                    <slot name="title"></slot>
                </h1>
                <h2 v-if="hasSubtitle">
                    <slot name="subtitle"></slot>
                </h2>
            </div>

            <div v-if="hasActions" :class="`${prefixCls}-page-header-actions-wrapper`">
                <slot name="actions"></slot>
            </div>
        </div>

        <div v-if="hasBottom" :class="`${prefixCls}-page-header-bottom-wrapper`">
            <slot name="bottom">&nbsp;</slot>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'VaPageHeader',
    props: {
      prefixCls: {
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
