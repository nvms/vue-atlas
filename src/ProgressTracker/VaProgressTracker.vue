<template>
  <ul v-if="round" class="va-steps-round-con">
    <template v-for="(label, index) in labels">
      <li :class="[getClassFromIndex(index)]" :key="index">
        <div class="va-steps-wrap">
          <div class="va-steps-round">
            <!-- {{index + 1}} -->
          </div>
        </div>
        <label>{{label}}</label>
      </li>
    </template>
  </ul>

  <div v-else class="va-steps clearfix">
    <template v-for="(label, index) in labels">
      <div class="va-steps-wrap" :key="index">
        <div :class="getClassFromIndex(index)">
          <label>
            <span class="va-steps-round">
              <!-- {{index + 1}} -->
            </span>
            <span>{{label}}</span>
          </label>
          <template v-if="index < labels.length - 1">
            <i class="va-steps-triangle-right-bg"></i>
            <i class="va-steps-triangle-right"></i>
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

      return 'va-steps-' + ret
    }
  }
}
</script>

<style lang="scss" src="../style/_reset.scss" scoped></style>
<style lang="scss">
@import "../variables";

$stepHeight: 24px;
$primaryColorHover: $B300;
$stepLabelMargin: 14px;
$primaryColor: $B400;
$lightColor: $N40;
$weightGrayColor: $N400;
$stepRoundSize: 5px;
$lightGrayColor: $N80;
$stepRoundLineHeight: 8px;
$stepRoundLineMargin: 7px;

.va-steps {
  font-size: 0px;
  overflow: hidden;
  line-height: 0px;
  margin: 18px 0px;
  display: flex;

  * {
    box-sizing: content-box;
  }

  &-wrap {
    padding: 0;
    flex: 1;
  }
  &-wrap > div {
    width: 100%;
    line-height: $stepHeight;
    vertical-align: top;
    font-size: 13px;
    position: relative;
  }
  &-wrap > div > label {
    margin: $stepLabelMargin;
    cursor: default;
  }
  &-triangle-right {
    display: inline-block;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: $stepHeight/2;
    position: absolute;
    right: -$stepHeight + 1;
    z-index: 1;
  }
  &-triangle-right-bg {
    display: inline-block;
    width: 0px;
    height: 0px;
    position: absolute;
    z-index: 1;
    border-width: $stepHeight/2;
    right: -($stepHeight + 1);
    border-color: transparent transparent transparent $N0;
  }
  &-round {
    display: inline-block;
    width: 0px;
    height: 0px;
    border-radius: 8px;
    text-align: center;
    line-height: 16px;
  }

  &-round + span:before {
    content: '\00a0';
  }
  &-finished {
    background-color: $primaryColorHover;
    color: $N0;
  }
  &-finished &-triangle-right {
    border-color: transparent transparent transparent $primaryColorHover;
  }
  &-finished &-round {
    background-color: fff;
    color: $primaryColorHover;
  }
  &-finished &-round > i {
    color: $primaryColorHover;
    font-size: 12px;
  }
  &-current {
    background-color: $primaryColor;
    color: $N0;
  }
  &-current &-triangle-right {
    border-color: transparent transparent transparent $primaryColor;
  }
  &-current &-round {
    background-color: $N0;
    color: $primaryColor;
  }
  &-todo {
    background-color: $lightColor;
    color: $weightGrayColor;
  }
  &-todo &-triangle-right {
    border-color: transparent transparent transparent $lightColor;
  }
  &-todo &-round {
    background-color: $N0;
  }
  > :last-child &-triangle-right,
  > :last-child &-triangle-right-bg {
    display: none;
  }
}

.va-steps-round-con {
  list-style-type: none;
  margin: 18px 0px;
  padding: 0px;
  display: flex;
  line-height: 1em !important;

  .va-steps-finished,
  .va-steps-current {
    .va-steps-wrap {
      .va-steps-round {
        display: none !important;
      }
    }
  }

  > li .va-steps-round {
    color: $N0;
    background-color: $lightGrayColor;
  }
  > .va-steps-finished:before {
    background-color: $primaryColorHover;
  }
  // > .va-steps-finished .va-steps-round {
    // background-color: $primaryColorHover;
    // border: 4px $primaryColorHover solid;
  // }
  > .va-steps-finished label {
    // color: $primaryColorHover;
    color: $N600 !important;
    font-weight: 600;
  }
  > .va-steps-current:before {
    background-color: $primaryColor;
    width: 50%;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  > .va-steps-current .va-steps-round {
    background-color: $B300;
    border: 4px $B300 solid;
    color: $N0;
  }
  > .va-steps-current label {
    color: $B300 !important;
    font-weight: 700;
  }
  > li {
    padding: 0px;
    position: relative;
    flex: 1;
    background-color: transparent;
    line-height: 22.5px !important;
  }

  &:before,
  &:after {
    content: ' ';
    display: table;
    clear: both;
  }

  > li:before {
    content: '';
    width: 100%;
    height: $stepRoundLineHeight;
    margin: $stepRoundLineMargin;
    display: block;
    float: left;
  }
  > li:first-child:before {
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
  }
  > li:last-child:before {
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
  }
  > li .va-steps-wrap {
    position: absolute;
    left: 50%;
    margin-left: -25px;
    width: 50px;
    text-align: center;
    top: 0px;
  }
  > li .va-steps-round {
    width: $stepRoundSize;
    height: $stepRoundSize;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    color: $N0;
    // line-height: 22px;
    text-align: center;
    border: 4px $lightGrayColor solid;
    color: $weightGrayColor;
  }
  > li .va-steps-round > i {
    color: $primaryColorHover;
    font-size: 12px;
  }
  > li label {
    width: 100%;
    text-align: center;
    color: $N100;
    font-weight: 500;
    margin: 10px 0px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  > .va-steps-finished:before,
  .va-steps-current:before {
    background-color: $primaryColorHover;
  }

  > .va-steps-finished .va-steps-round {
    border: 4px $primaryColorHover solid;
    background-color: $primaryColorHover;
    color: $N0;
  }

  > .va-steps-finished label,
  .va-steps-current label {
    color: $primaryColorHover;
  }
}
</style>
