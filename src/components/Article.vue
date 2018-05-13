<template>
  <div class="content">
    <div v-show="show" class="row">
      <div class="col-9">
        <b-breadcrumb class="bg-white mb-2" :items="items"/>
        <div class="bg-white mb-1 mb-sm-2 p-2 p-lg-3">
          <h2 class="title mb-3 text-primary">{{title}}</h2>
          <span class="small ml-3">作者 {{author}}&nbsp&nbsp·&nbsp&nbsp</span>
          <span class="small">{{formatCreateDate(time)}}&nbsp&nbsp·&nbsp&nbsp</span>
          <span class="small">{{click_nums}} 阅读</span>
          <hr class="mb-4">
          <span v-html="content"></span>
        </div>
      </div>
      <div class="col-3">
          {{msg}}
      </div>
    </div>
  </div>
</template>

<script>
  import {getBlogDetail} from "../api/api";

  export default {
    name: 'Article',
    data() {
      return {
        post: '',
        msg: '目录占楼',
        title: '',
        author: '',
        time: '',
        click_nums: 0,
        content: '',
        show: false,
        items: [{
          text: '',
          to: ''
        }, {
          text: '',
          to: ''
        }, {
          text: '',
          active: true
        }]
      }
    },
    mounted() {
      console.log(this.$route.params);
      getBlogDetail(this.$route.params.id)
        .then((response) => {
          this.post = response.data;
          this.title = this.post.title;
          this.author = this.post.author.nick_name;
          this.time = this.post.create_time;
          this.click_nums = this.post.click_nums;
          this.content = this.post.content;

          this.items = [{
            text: "<i class='fa fa-home'>&nbsp&nbsp首页",
            to: '/'
          }, {
            text: this.post.category.name,
            to: {name:'category', params:{category:this.post.category.id, showCategory:true}}
          }, {
            text: this.title,
            active: true
          }];
          this.show = true;
      })
    },
    methods: {
      formatCreateDate(date) {
        let create_time = new Date(date);
        let now = new Date().getTime();
        let day = Math.abs(now-create_time.getTime());
        let res = new Date(day).getDate()-1;

        switch (res) {
          case 0: res = '今天发布'; break;
          case 1: res = '昨天发布'; break;
          case 2: res = '前天发布'; break;
          default:
            if(res <= 7) {
              res = res + '天前发布'
            } else {
              res = create_time.getFullYear()+'年'+create_time.getMonth()+'月'+create_time.getDay()+'日';
            }
        }
        res = create_time.getFullYear()+'年'+create_time.getMonth()+'月'+create_time.getDay()+'日';
        return res
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/custom.scss';
hr {
  height: 1px;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
}
.breadcrumb-item>a {
  color: #000;
  text-decoration: none;
  transition:all 0.05s;
}
.breadcrumb-item>a:active {
  color: #000;
  transition:all 0.05s;
}
.breadcrumb-item>a:hover {
  color: $pink;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
}
</style>
