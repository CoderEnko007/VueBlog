<template>
  <b-card bg-variant="white" no-body header="<i class='fa fa-book mr-2 f-17'></i><b>文章分类</>">
    <b-list-group flush>
      <b-list-group-item
        v-for="category in categories"
        :key="category.id"
        @click="filterPost(category.id)"
        class="d-flex justify-content-between align-items-center">
        <router-link :to="'/category/'+category.id" >{{category.name}}</router-link>
        <b-badge variant="primary" pill>{{category.nums}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
  import {getCategory} from "../api/api";

  export default {
    name: 'CategoryCard',
    data () {
      return {
        categories: [],
        loading: true,
      }
    },
    methods: {
      getCategoryList(){
        getCategory().then((response) => {
          this.categories = response.data;
        })
      },
      filterPost(id) {
        this.$emit('filterByCategory', id)
      }
    },
    mounted() {
      this.getCategoryList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';
.card-header {
  background-color: white;
}
.list-group-item>a {
  color: #000;
  text-decoration: none;
}
.list-group-item>a:hover {
  color: $pink;
}
.router-link-active {
  color: $pink !important;
}
</style>
