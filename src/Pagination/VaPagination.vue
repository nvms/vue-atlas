<template>
  <div :class="classObj">
    <ul>
      <va-pagination-item :disabled="onFirstPage" :index="currentValue - 1">
        <va-icon type="angle-left"/>
      </va-pagination-item>

      <div v-if="!startEllipsis" style="width: 70px;">&nbsp;</div>

      <va-pagination-item v-if="startEllipsis" :index="1">1</va-pagination-item>

      <va-pagination-item v-if="startEllipsis" :index="2" :disabled="true">
        <va-icon type="ellipsis-h" size="10px"/>
      </va-pagination-item>

      <va-pagination-item
        v-for="(page, index) in pages"
        :key="index"
        :active="page === currentValue"
        :index="page"
      >{{page}}</va-pagination-item>

      <template v-if="!endEllipsis && pageCount - 1 >= end">
        <va-pagination-item>{{pageCount}}</va-pagination-item>
      </template>

      <va-pagination-item
        v-if="endEllipsis"
        :index="pageCount - 1"
        :disabled="true"
      >
        <va-icon type="ellipsis-h" size="10px"/>
      </va-pagination-item>

      <va-pagination-item v-if="endEllipsis" :index="pageCount">{{pageCount}}</va-pagination-item>

      <div v-if="!endEllipsis" style="width: 35px;">&nbsp;</div>
      <div v-if="pageCount - end === 0" style="width: 35px;">&nbsp;</div>

      <va-pagination-item :disabled="onLastPage" :index="currentValue + 1">
        <va-icon type="angle-right"/>
      </va-pagination-item>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VaPagination',
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 1
    },
    total: {
      type: Number
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      onFirstPage: false,
      onLastPage: false,
      startEllipsis: false,
      endEllipsis: false,
      pageCount: 0,
      start: 0,
      end: 0,
      pages: [],
      currentValue: this.value > 1 ? this.value : 1
    }
  },
  methods: {
    getPage () {
      return Math.max(this.max, this.pageCount)
    },
    countPage (end, start = 0) {
      const pages = []
      const min = Math.min(end, this.pageCount)

      for (let i = start; i < min; i++) {
        pages.push(i + 1)
      }

      this.pages = pages
    },
    checkStartOrEnd (index) {
      this.onFirstPage = false
      this.onLastPage = false
      this.startEllipsis = false
      this.endEllipsis = false

      if (index === 1) {
        this.onFirstPage = true
      }
      if (index === this.pageCount) {
        this.onLastPage = true
      }
      // let s = this.currentValue - Math.floor(this.max / 2)
      const e = this.currentValue + Math.floor(this.max / 2)

      if (
        this.max < this.pageCount &&
        !this.onLastPage &&
        e < this.pageCount - 1
      ) {
        this.endEllipsis = true
      }
      if (
        this.max < this.pageCount &&
        !this.onFirstPage &&
        this.currentValue >= this.max
      ) {
        this.startEllipsis = true
      }
    },
    changePage (index) {
      const { max } = this
      const middle = Math.ceil(max / 2)

      if (index <= 1) {
        index = 1
      } else if (index >= this.getPage()) {
        index = this.getPage()
      }

      this.start = index - middle
      this.end = Math.min(index + max - middle, this.pageCount)

      if (index < max) {
        this.end = max
      }
      if (this.end - this.start <= max) {
        this.start = this.end - max
      }
      if (this.start <= 0 || index < max) {
        this.start = 0
      }

      this.currentValue = index
      this.countPage(this.end, this.start)
      this.checkStartOrEnd(index)
      this.$emit('change', {
        pageNumber: this.currentValue,
        perPage: this.perPage
      })
    },
    initCount (total, value) {
      this.pageCount = Math.ceil(total / this.perPage)
      this.countPage(this.max)
      this.checkStartOrEnd(value)
      this.changePage(value)
    }
  },
  computed: {
    classObj () {
      const classes = {}

      classes['va-pagination'] = true

      return classes
    }
  },
  mounted () {
    this.initCount(this.total, this.currentValue)
  },
  watch: {
    total (val) {
      this.initCount(val, this.currentValue)
    },
    value (val) {
      this.initCount(this.total, val)
    },
    perPage () {
      this.initCount(this.total, this.currentValue)
    },
    max () {
      this.initCount(this.total, this.currentValue)
    }
  }
}
</script>

<style lang="scss">
.va-pagination {
  display: flex;
  justify-content: space-around;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
}
</style>
