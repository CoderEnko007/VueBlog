<template>
  <div id="blog-list" class="pt-3">
    <b-table hover fixed :items="listData" :fields="fields" outlined
             :current-page="currentPage" :per-page="pageSize">
      <template slot="title" slot-scope="data">
        <b-button size="sm" variant="link" :to="{name: 'posts', params: {id:data.item.id}}">{{data.value}}</b-button>
      </template>
      <template slot="operate" slot-scope="data">
        <b-button size="sm" variant="danger" @click="handleDelete(data)">删 除</b-button>
        <b-button size="sm" variant="secondary" @click="handleEdit(data)">编 辑</b-button>
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
  import { Loading } from 'element-ui';
  import {getAdminList, deleteArticle} from "../api/api";

  export default {
    name: 'ListPage',
    components: {
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
          'author.username': {
            label: '文章作者',
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
          },
          operate: {
            label: '操作',
          },
        },
        listData: [],
        currentPage: 1,
        postsNum: 0,
        pageSize: 7,
        post_id: 0,
        loadingInstance: {},
      }
    },
    methods: {
      getListData() {
        this.loadingInstance = Loading.service({ target: '#blog-list' });
        getAdminList().then((response) => {
          this.listData = response.data;
          this.postsNum = this.listData.length;
          this.loadingInstance.close();
        }).catch(error => {
          console.log(error);
          this.loadingInstance.close();
        });
      },
      operateDeleteArticle(id) {
        this.loadingInstance = Loading.service({ target: '#blog-list' });
        deleteArticle(id).then(() => {
          this.getListData();
        })
      },
      pageChange(currentPage) {
        console.log('pageChange '+ currentPage);
        this.currentPage = currentPage;
        this.getListData();
      },
      handleEdit(data) {
        this.post_id = data.item.id;
        this.$router.push({
          name: 'editPage',
          query: {id: this.post_id}
        })
      },
      handleDelete(data) {
        this.$confirm('删除该文章，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operateDeleteArticle(data.item.id)
        })
      }
    },
    mounted() {
      this.getListData();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-list {
  min-height: 540px;
  background-color: white;
}
.table-td>.btn {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>
