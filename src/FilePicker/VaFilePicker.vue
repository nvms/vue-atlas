<template>
  <div class="va-file-picker_wrapper">
    <div class="va-file-picker_input">
      <input v-bind="$attrs" :multiple="multiple" @change="onChange" type="file" ref="input"/>
      <div class="va-file-picker_trigger">
        <va-button class="va-file-picker_trigger-button" @click="onClick" icon-after="upload">
          {{label}}
        </va-button>
      </div>
    </div>
    <div v-if="multiple && this.value" class="va-file-picker_list">
      <div v-for="(file, index) in value" :key="file.name" class="va-file-picker_list-item">
        <span>{{file.name}}</span>
        <va-toggle-icon :type="getMIMEIcon(file.type)" type-active="times" @click="onRemove(index)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaFilePicker',
  inheritAttrs: false,
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    label () {
      return this.multiple || !this.value ? 'Upload' : this.value.name
    }
  },
  data () {
    return { value: null }
  },
  methods: {
    getMIMEIcon (type) {
      switch (true) {
        case type.startsWith('image/'):
          return 'image'
        case type.startsWith('video/'):
          return 'video'
        case type.startsWith('audio/'):
          return 'file-audio'
        default:
          return 'file'
      }
    },
    onClick () {
      this.$refs.input.click()
    },
    onChange (evt) {
      this.value = this.multiple ? Array.from(evt.target.files).concat(this.value || []) : evt.target.files[0]
      this.$emit('input', this.value)
      this.$emit('change', this.value)
    },
    onRemove (index) {
      this.$emit('remove', this.value[index])
      this.value.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../variables";

  .va-file-picker_wrapper {
    width: 100%;
  }

  .va-file-picker_input {
    width: 100%;
    cursor: pointer;
    position: relative;
    height: 34px;

    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .va-file-picker_trigger {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      .va-file-picker_trigger-button {
        display: block;
      }
    }
  }

  .va-file-picker_list {
    padding: 4px 0;

    .va-file-picker_list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $N400;
      padding: 2px 10px;
      border-radius: 3px;
      cursor: pointer;
      transition: background .2s ease-out;

      &:hover {
        background: $N20;
      }
    }
  }
</style>
