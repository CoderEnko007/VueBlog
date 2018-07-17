<template>
  <b-card bg-variant="white" no-body header="<i class='fa fa-book mr-2 f-17'></i><b>文章分类</>">
    <b-list-group flush>
      <b-list-group-item v-for="category in categories"
                         :key="category.id"
                         @click="handleClick(category.id)"
                         style="cursor: pointer;"
                         class="d-flex justify-content-between align-items-center">
        <span :class="{active: selectItem === category.id}">{{category.name}}</span>
        <b-badge variant="primary" pill>{{category.nums}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: ['categories'],
  data () {
    return {
      selectItem: 0,
      loading: true,
    }
  },
  methods: {
    handleClick(id) {
      this.$emit('itemClick', id)
    },
  },
  watch: {
    '$route': function (route) {
      this.selectItem = route.params.category
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';
.card {
  border: 1px solid #ebeef5;
}
.card-header {
  background-color: white;
}
.list-group-item:hover {
  color: $pink;
}
.active {
  color: $pink !important;
}
</style>
