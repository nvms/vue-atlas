<template>
  <div :class="classObj">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VaTable',
  props: {
    hover: {
      type: Boolean,
      default: false,
      required: false
    },
    size: {
      type: String,
      default: 'lg',
      validator (v) {
        return ['lg', 'md', 'sm'].includes(v)
      }
    }
  },
  computed: {
    classObj () {
      const { size, hover } = this
      const classes = {}

      classes['va-table'] = true
      classes['va-table-' + size] = true
      classes['va-table-hover'] = hover

      return classes
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

.va-table {
  margin: 1em 0;
  &-fullwidth {
    table {
      width: 100%;
    }
  }

  &-lg {
    table {
      width: 100%;
    }
  }
  &-md {
    table {
      width: 960px;
      max-width: 960px;
      margin: 0 auto;
    }
  }
  &-sm {
    table {
      width: 680px;
      max-width: 680px;
      margin: 0 auto;
    }
  }

  &-hover {
    table tbody tr:hover {
      background: $N10;
    }
  }
  table {
    border-collapse: collapse;
  }
  thead,
  tbody,
  tfoot {
    border-bottom: 2px solid $N40;
  }
  thead tr th {
    color: $N90;
    font-weight: 500;
    line-height: 24px;
  }
  table td,
  table td:first-child,
  table th,
  table th:first-child {
    margin: 0;
    padding: 8px;
    text-align: left;
  }
}

.va-page-container-article {
  .va-table {
    margin: 3em 0 4em 0;
  }
}
</style>
