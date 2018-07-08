<template>
  <div class="app-container">
    <div class="filter-container clearfix">
      <div class="filter">
        <el-input v-model="newCategory" style="width: 200px;" placeholder="新分类名称"></el-input>
        <el-button class="add-btn" @click="handleCreate" type="primary" icon="el-icon-edit">创建文章分类</el-button>
      </div>
    </div>
    <el-table :data="categories" border fit highlight-current-row >
      <el-table-column width="65" align="center" label="序号" >
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="mini" v-model="scope.row.name"></el-input>
            <el-button class='cancel-btn' size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="65" align="center" label="文章数" >
        <template slot-scope="scope">
          <span>{{scope.row.nums}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="创建日期" >
        <template slot-scope="scope">
          <span>{{scope.row.add_time}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="mini" icon="el-icon-circle-check-outline">确定</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getCategory, addCategory, patchCategory, delCategory} from "../api/api";

export default {
  data() {
    return {
      categories: null,
      newCategory: null,
    }
  },
  methods: {
    fetchCategory() {
      getCategory().then(res => {
        const items = res.data
        this.categories = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalName = v.name
          return v
        })
      }).catch(err => {
        this.$message.error(err);
      })
    },
    handleCreate() {
      if (this.newCategory) {
        addCategory({name: this.newCategory}).then(res => {
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.fetchCategory()
        }).catch(err => {
          this.$notify.error({
            title: '错误',
            message: '添加失败:'+err.name
          });
        })
      }
    },
    cancelEdit(row) {
      row.name = row.originalName
      row.edit = false
      this.$message({
        message: '取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      patchCategory(row.id, {
        name: row.name
      }).then(res => {
        row.originalName = row.name
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
      }).catch(err => {
        row.name = row.originalName
        this.$notify.error({
          title: '错误',
          message: '修改失败:'+err.name
        });
      })

    },
    handleDelete(row) {
      delCategory(row.id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
        this.fetchCategory()
      }).catch(err => {
        this.$notify.error({
          title: '失败',
          message: err
        })
      })
    }
  },
  mounted() {
    this.fetchCategory()
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/custom';
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
