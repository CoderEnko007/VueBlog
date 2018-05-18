<template>
  <div id="blog-list" class="pt-3">
    <!--<el-table :data="listData" border>-->
      <!--<el-table-column  label="标题" width="180" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.title }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column  label="标签" width="180" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.tag}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column  label="日期" width="150">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.date}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column  label="描述" min-width="320" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.description}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column  label="操作"  width="160">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <!--<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <b-table hover fixed :items="listData" :fields="fields" outlined
             :current-page="currentPage" :per-page="pageSize">
      <template slot="title" slot-scope="data">
        <!--<router-link :to="{name: 'editPage', query: {id:getPostId}}" @click="handRowClicked">{{data.value}}</router-link>-->
        <b-button size="sm" variant="link" @click="handleEditPost(data)">{{data.value}}</b-button>
      </template>
    </b-table>
    <b-pagination
      class="pt-3"
      align="center"
      size="md"
      :total-rows="postsNum"
      v-model="currentPage"
      :per-page="pageSize"
      @change="pageChange">
    </b-pagination>
  </div>
</template>

<script>
  import vueLoading from 'vue-loading-template'
  import {getAdminList} from "../api/api";

  // import Vue from 'vue'
  // import {Table, TableColumn, Button, MessageBox} from 'element-ui'
  // Vue.prototype.$confirm = MessageBox.confirm;

  export default {
    name: 'ListPage',
    components: {
      vueLoading,
      // 'el-table': Table,
      // 'el-button': Button,
      // 'el-table-column': TableColumn,
    },
    data () {
      return {
        fields: {
          title: {
            label: '文章标题',
            tdClass: 'table-td'
          },
          category: {
            label: '文章分类',
          },
          click_nums: {
            label: '点击数',
            sortable: true
          },
          summary: {
            label: '概述',
          },
          create_time: {
            label: '创建时间',
            sortable: true
          }
        },
        listData: [],
        currentPage: 1,
        postsNum: 0,
        pageSize: 7,
        post_id: 0,
      }
    },
    methods: {
      // handleEdit(index, row) {
      //   console.log(index, row)
      // },
      // handleDelete(index, row) {
      //   this.$confirm('删除该文章，是否继续？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     console.log(this.listData.length)
      //     this.listData.splice(index, 1);
      //     console.log(this.listData.length)
      //   })
      // },
      getListData() {
        getAdminList().then((response) => {
          console.log(response)
          this.listData = response.data;
          this.postsNum = this.listData.length;
        }).catch(error => {
          console.log(error);
        });
      },
      pageChange(currentPage) {
        console.log('pageChange '+ currentPage)
        this.currentPage = currentPage;
        this.getListData();
      },
      handleEditPost(data) {
        this.post_id = data.item.id;
        this.$router.push({
          name: 'editPage',
          query: {id: this.post_id}
        })
      }
    },
    mounted() {
      this.getListData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-list {
  height: 100%;
  background-color: white;
}
.table-td>.btn {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>
