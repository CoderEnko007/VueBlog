<template>
  <div class="app-container">
    <div class="filter-container clearfix">
      <div class="filter">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="博客名称" v-model="filterForm.search"/>
        <el-select clearable style="width: 130px" v-model="filterForm.category" placeholder="文章分类">
          <el-option v-for="item in categoryOption" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select clearable style="width: 130px" v-model="filterForm.ordering" placeholder="排序">
          <el-option v-for="(item, index) in orderingOption" :key="index" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
        <el-button class="ml-3" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleCreate">新建博客</el-button>
      </div>
    </div>

    <el-table :data="listData" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column width="300" align="left" label="文章标题" >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top-end">
            <router-link :to="{name: 'posts', params: {id: scope.row.id}}">
              <span class="link-type">{{scope.row.title}}</span>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="150" align="left" label="文章分类" >
        <template slot-scope="scope">
          <span>{{scope.row.category.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="left" label="文章标签" >
        <template slot-scope="scope">
          <span v-for="(tag, index) in scope.row.tags">{{tag}}<span v-if="index !== scope.row.tags.length-1">,</span></span>
        </template>
      </el-table-column>
      <el-table-column min-width="300" align="left" label="概述" >
        <template slot-scope="scope">
          <span>{{scope.row.summary}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="left" label="创建时间" >
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="点击数" >
        <template slot-scope="scope">
          <span>{{scope.row.click_nums}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="pageChange" :current-page="listQuery.page"
                     :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="postsNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {getBlogList, getCategory, deleteArticle} from "../api/api";

  export default {
    name: 'ListPage',
    data () {
      return {
        listData: null,
        categoryOption: null,
        postsNum: 0,
        pageSize: 5,
        filterForm: {
          search: null,
          category: null,
          ordering: '-create_time'
        },
        orderingOption: [
          {key: '-create_time', name: '↓ 创建时间'},
          {key: 'create_time', name: '↑ 创建时间'},
          {key: '-click_nums', name: '↓ 点击数'},
          {key: 'click_nums', name: '↑ 点击数'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'listQuery'
      ]),
    },
    methods: {
      fetchBlogData() {
        getBlogList(this.listQuery).then(res => {
          this.listData = res.data.results;
          this.postsNum = res.data.count;
        }).catch(err => {
          this.handleError(err)
        });
      },
      fetchCategoryData() {
        getCategory().then(res => {
          this.categoryOption = res.data;
        }).catch(err => {
          this.handleError(err)
        });
      },
      operateDeleteArticle(id) {
        deleteArticle(id).then(() => {
          this.fetchBlogData();
        })
      },
      pageChange(currentPage) {
        this.$store.dispatch('SetQueryPage', currentPage).then(() => {
          this.fetchBlogData();
        }).catch(err => {
          this.handleError(err)
        })
      },
      handleEdit(id) {
        this.$router.push({
          name: 'editPage',
          params: {id: id}
        })
      },
      handleCreate() {
        this.$router.push({
          name: 'createPage',
        })
      },
      handleDelete(id) {
        this.$confirm('删除该文章，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operateDeleteArticle(id)
        }).catch(() => {
          // 取消删除
        })
      },

      handleFilter() {
        this.$store.dispatch('SetListQuery', {
          search: this.filterForm.search,
          category: this.filterForm.category,
          ordering: this.filterForm.ordering
        }).then(() => {
          this.fetchBlogData()
        }).catch(err => {
          this.handleError(err)
        })
      },
      handleReset() {
        this.$store.dispatch('ResetQueryList').then(() => {
          this.filterForm = {
            search: null,
              category: null,
              ordering: '-create_time'
          }
          this.fetchBlogData()
        }).catch(err => {
          this.handleError(err)
        })
      },

      handleError(err) {
        console.log(err)
      }
    },
    mounted() {
      this.handleReset();
      this.fetchCategoryData();
    },
    watch: {
      '$route': function() {
        console.log(this.$route.path)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/custom';
.cell span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pagination-container {
  margin-top: 15px;
}
</style>
