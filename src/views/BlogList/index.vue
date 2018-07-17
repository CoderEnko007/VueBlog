<template>
<div id="blog-list">
  <div class="row">
    <div class="col-lg-8">
      <router-view></router-view>
    </div>
    <div class="col-lg-4 hidden-sm-and-down">
      <CategoryCard :categories="categories" @itemClick="filterByCategory"></CategoryCard>
      <VueTagCloud class="mt-4" :tags="tags" @itemClick="filterByTag"></VueTagCloud>
    </div>
  </div>
</div>
</template>

<script>
import CategoryCard from '@/components/CategoryCard'
import VueTagCloud from "@/components/VueTagCloud";
import { getTags, getCategory } from "@/api/api";

export default {
  name: 'BlogList',
  components: {
    CategoryCard,
    VueTagCloud,
  },
  data () {
    return {
      listData: null, // 获取的数据列表
      tags: [],
      categories: []
    }
  },
  methods: {
    fetchTags() {
      getTags().then(res => {
        this.tags = res.data
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: '标签获取失败'
        })
      })
    },
    fetchCategories() {
      getCategory().then(res => {
        this.categories = res.data
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: '标签获取失败'
        })
      })
    },

    // 按文章类别过滤文章
    filterByCategory(id) {
      this.$store.dispatch('SetQueryCategory', id).then(() => {
        this.$router.push({ name: 'category', params: {category: id} })
      })
    },
    // 按文章标签过滤文章
    filterByTag(id) {
      this.$store.dispatch('SetQueryTag', id).then(() => {
        this.$router.push({ name: 'tags', params: {tag: id} })
      })
    },
  },
  mounted() {
    // 获取标签列表
    this.fetchTags()
    this.fetchCategories()
    console.log('index mounted', this.$route.name, this.$route.params)
  },
  watch: {
    '$route': function(route) {
      console.log('index watch', route.name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/css/custom';
.tag-cloud {
  margin-top: 40px;
}
</style>
