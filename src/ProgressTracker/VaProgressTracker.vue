<template>
  <ul v-if="round" :class="`${classPrefix}-steps-round-con`">
    <template v-for="(label, index) in labels">
      <li :class="[getClassFromIndex(index)]" :key="index">
        <div :class="`${classPrefix}-steps-wrap`">
          <div :class="`${classPrefix}-steps-round`">
            <!-- {{index + 1}} -->
          </div>
        </div>
        <label>{{label}}</label>
      </li>
    </template>
  </ul>

  <div v-else :class="`${classPrefix}-steps clearfix`">
    <template v-for="(label, index) in labels">
      <div :class="`${classPrefix}-steps-wrap`" :key="index">
        <div :class="getClassFromIndex(index)">
          <label>
            <span :class="`${classPrefix}-steps-round`">
              <!-- {{index + 1}} -->
            </span>
            <span>{{label}}</span>
          </label>
          <template v-if="index < labels.length - 1">
            <i :class="`${classPrefix}-steps-triangle-right-bg`"></i>
            <i :class="`${classPrefix}-steps-triangle-right`"></i>
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
    classPrefix: {
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

      return this.classPrefix + '-steps-' + ret
    }
  }
}
</script>
