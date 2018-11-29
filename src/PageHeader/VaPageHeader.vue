<template>
  <div :class="`${prefixCls}-page-header`">

    <div :class="`${prefixCls}-page-header-breadcrumb-wrapper`">
      <div :class="`${prefixCls}-page-header-breadcrumb-container`">
        <slot name="breadcrumb">&nbsp;</slot>
      </div>
    </div>

    <div :class="`${prefixCls}-page-header-title-wrapper`">
      <div :class="`${prefixCls}-page-header-title-container`">
        <h1>
          <slot name="title"></slot>
        </h1>
      </div>

    </div>

    <div :class="`${prefixCls}-page-header-subtitle-container`">
      <h2>
        <slot name="subtitle"></slot>
      </h2>
    </div>

    <div :class="`${prefixCls}-page-header-bottom-wrapper`">
      <slot name="bottom">&nbsp;</slot>
      <div :class="`${prefixCls}-page-header-actions-wrapper`">
        <slot name="actions"></slot>
      </div>
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
  }
}
</script>
