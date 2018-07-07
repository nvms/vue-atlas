<template>
  <i :class="[prefixCls + '-fa', prefixCls + '-fa-' + type]" :style="{fontSize:size,color:color,margin:margin,backgroundColor:bgColor,borderRadius:'4px',padding:padding}">
    <slot />
  </i>
</template>

<script>
export default {
  name: 'VaIcon',
  props: {
    type: {
      type: String,
      required: true,
      note: 'The type of icon: .fa-[type]'
    },
    size: {
      type: String,
      required: false,
      default: '1em',
      note: 'The size, in px or em, of the icon.'
    },
    color: {
      type: String,
      required: false,
      note: 'Color to apply to the icon.'
    },
    bgColor: {
      type: String,
      default: 'transparent',
      required: false,
      note: 'Background color of the icon'
    },
    margin: {
      type: String,
      default: '0px',
      required: false,
      note: 'Margin to be applied to the outside of the icon element.'
    },
    padding: {
      type: String,
      default: '0px',
      required: false,
      note: 'Convenience prop: padding to be applied to the icon. Useful for when you need to assign a custom bgColor to an icon.'
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  }
}
</script>
