<template>
  <label :class="classObj" @click.prevent>
    <input
      :checked="value"
      class="va-toggle__input"
      :name="name"
      @keypress.space.prevent="toggle"
      tabindex="-1"
      type="checkbox"
    >
    <div
      :aria-label="label"
      class="va-toggle__slide"
      :tabindex="disabled ? -1 : 0"
      @click="toggle"
      @keypress.space.prevent="toggle"
    >
      <div class="va-toggle__inner">
        <span class="va-toggle__handle"></span>
        <span class="va-toggle__icon">
          <va-icon :type="icon"></va-icon>
        </span>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'VaToggle',
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      required: false,
      validator (v) {
        return ['md', 'lg'].includes(v)
      }
    }
  },
  computed: {
    classObj () {
      const classes = {}
      classes['va-toggle'] = true
      classes['va-toggle--checked'] = this.value
      classes['va-toggle--disabled'] = this.disabled
      classes['va-toggle--lg'] = this.size === 'lg'
      return classes
    },
    icon () {
      return this.value ? 'check' : 'times'
    }
  },
  methods: {
    toggle () {
      if (this.disabled) {
        return
      }
      const newState = !this.value
      this.$emit('input', newState)
      this.$emit('change', newState)
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-toggle {
  $self: &;
  display: inline-block;
  padding: 2px;

  &__input {
    opacity: 0;
    position: absolute;
  }

  &__slide {
    box-sizing: initial;
    background-clip: content-box;
    background-color: $N200;
    display: block;
    height: 16px;
    position: relative;
    width: 32px;
    border-radius: 16px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    padding: 2px;
    transition: all 0.15s ease 0s;

    &:focus {
      border-color: $B100;
      outline: none;
    }

    &:hover {
      background-color: $N70;
      cursor: pointer;
    }
  }

  &__inner {
    color: $N0;
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    width: 100%;
  }

  &__handle {
    background-color: $N0;
    bottom: 4px;
    content: '';
    height: 12px;
    left: 4px;
    position: absolute;
    transform: initial;
    width: 12px;
    border-radius: 50%;
    transition: all 0.15s ease 0s;
  }

  &__icon {
    font-size: 12px;
    display: flex;
    max-width: 16px;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 4px;
    width: 16px;
    height: 16px;
  }

  &--checked {
    #{$self}__slide {
      background-color: $G400;

      &:hover {
        background-color: $G300;
      }
    }

    #{$self}__inner {
      flex-direction: row;
    }

    #{$self}__handle {
      transform: translateX(16px);
    }

    #{$self}__icon {
      padding-left: 4px;
      padding-right: 0;
    }
  }

  &--lg {
    #{$self}__slide {
      height: 20px;
      width: 40px;
      border-radius: 20px;
    }

    #{$self}__handle {
      height: 16px;
      width: 16px;
    }

    #{$self}__icon {
      font-size: 16px;
      height: 20px;
      width: 20px;
      max-width: 20px;
    }

    &#{$self}--checked {
      #{$self}__handle {
        transform: translateX(20px);
      }
    }
  }

  &--disabled {
    #{$self}__slide {
      cursor: not-allowed;
      background-color: $N20;

      &:hover {
        background-color: $N20;
      }

      &:focus {
        border-color: transparent;
      }
    }

    #{$self}__inner {
      color: $N70;
    }
  }
}
</style>
