<template>
  <div id="app">
    <my-header v-show="isHeader"></my-header>
    <div class="layout" :class="{'noHeader':!isHeader}">
      <router-view></router-view>
    </div>
    <player></player>
    <songList :class="{'show':isSongList}"></songList>
  </div>
</template>

<script>
import MyHeader from '@/components/base/Header'
import Player from '@/components/base/Player'
import SongList from '@/components/base/SongList'

import { mapMutations, mapGetters } from 'vuex' 

export default {
  name: 'app',
  components:{
    MyHeader, Player, SongList
  },
  computed: {
    ...mapGetters([
        'isHeader',
        'openPlayer',
        'isPlay',
        'isSongList',
        'url'
    ])
  },
  watch: {
    '$route':'barState'
  },
  methods: {
    barState(){
      if(this.$route.name == 'playerBox'){
        this.$store.commit('setOpenPlayer',false)
        this.$store.commit('setIsHeader',false)
      }else{
        this.$store.commit('setIsHeader',true)
        if(this.url){
          this.$store.commit('setOpenPlayer',true)
        }
      } 
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img, object {
    max-width: 100%;
}
img {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-interpolation-mode: bicubic;
    vertical-align: middle;
}
img {
    border: 0;
}
ol,ul{
  list-style: none;
}
input, textarea {
  outline: 0;
}
body, button, h1, h2, h3, input, ol, pre, select, textarea, ul {
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
}
@font-face {
    font-family: iconfont;
    src: url(//static0.qianqian.com/web/st/font/iconfont-53a.woff) format('woff'),url(//static0.qianqian.com/web/st/font/iconfont-3dd.ttf) format('truetype'),url(//static0.qianqian.com/web/st/font/iconfont-b13.svg) format('svg')
}
.iconfont {
    font-family: iconfont!important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.btn {
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  background-color: #fdfcfc;
  background-image: -webkit-gradient(linear,left top,left bottom,from(#fff),to(#f9f8f8));
  background-image: -webkit-linear-gradient(top,#fff,#f9f8f8);
  background-image: linear-gradient(to bottom,#fff,#f9f8f8);
  background-repeat: repeat-x;
  color: #333;
  text-shadow: 0 1px 1px rgba(255,255,255,.75);
  display: inline-block;
  padding: 0 8px;
  margin-bottom: 0;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #999;
  font-size: 14px;
}
input:-moz-placeholder,textarea:-moz-placeholder {
  color: #999;
  font-size: 15px
}

input:-ms-input-placeholder,textarea:-ms-input-placeholder {
  color: #999;
  font-size: 15px
}

input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
  color: #999;
  font-size: 15px
}
.clearfix:after,.clearfix:before {
    display: table;
    content: '';
    line-height: 0
}

.clearfix:after {
    clear: both
}
</style>

<style scoped>
  .layout{
      margin-top: 90px;
      background: #fff;
      overflow: hidden;
      padding: 10px;
  }
  .layout.noHeader{
    margin-top:0;
  }
</style>
