<template>
<el-card class="box-card" shadow="never">
  <div slot="header" class="clearfix">
    <span><i class='fas fa-tags mr-2 f-17'></i><b>标签</b></span>
  </div>
  <div class="tags-container" v-for="(tag, index) in tags" :key="index">
    <div @click="handleClick(tag.id)" style="cursor: pointer;">
      <el-tag :type="randomType()" size="medium">
        <span>{{tag.name}}</span>
      </el-tag>
    </div>
  </div>
</el-card>
</template>
<script>
const tagTypes = ['null', 'success', 'info', 'warning', 'danger']

export default {
  name: 'VueTagCloud',
  props: ['tags'],
  data() {
    return {
      type: null
    }
  },
  methods: {
    randomType() {
      let length = tagTypes.length
      let random = Math.floor(Math.random()*(length+1))
      return tagTypes[random]
    },
    handleClick(id) {
      this.$emit('itemClick', id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/custom';

</style>
