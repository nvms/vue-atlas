<template>
  <ul v-if="round" :class="`${prefixCls}-steps-round-con`">
    <template v-for="(label, index) in labels">
      <li :class="[getClassFromIndex(index)]" :key="index">
        <div :class="`${prefixCls}-steps-wrap`">
          <div :class="`${prefixCls}-steps-round`">
            <!-- {{index + 1}} -->
          </div>
        </div>
        <label>{{label}}</label>
      </li>
    </template>
  </ul>

  <div v-else :class="`${prefixCls}-steps clearfix`">
    <template v-for="(label, index) in labels">
      <div :class="`${prefixCls}-steps-wrap`" :key="index">
        <div :class="getClassFromIndex(index)">
          <label>
            <span :class="`${prefixCls}-steps-round`">
              <!-- {{index + 1}} -->
            </span>
            <span>{{label}}</span>
          </label>
          <template v-if="index < labels.length - 1">
            <i :class="`${prefixCls}-steps-triangle-right-bg`"></i>
            <i :class="`${prefixCls}-steps-triangle-right`"></i>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'VaProgressTracker',
  props: {
    labels: {
      type: Array,
      required: true
    },
    current: {
      type: Number,
      default: 1
    },
    round: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  methods: {
    getClassFromIndex (index) {
      let ret = ''

      if (index === this.current - 1) {
        ret = 'current'
      } else if (index < this.current - 1) {
        ret = 'finished'
      } else {
        ret = 'todo'
      }

      return this.prefixCls + '-steps-' + ret
    }
  }
}
</script>
