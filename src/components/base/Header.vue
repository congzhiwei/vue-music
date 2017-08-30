<template>
	<header id="header" class="header animated headroom--top">
	    <div class="bar  bar-form ">
	        <div class="left"></div>
	        <div class="title">音乐优选</div>
	        <div class="right">
	            <span class="btn btn-ucenter url" data-name="ucenter" data-url="/ucenter" data-transition="none"></span>
	            <span class="btn log btn-search" data-log="{&quot;pos&quot;:&quot;searchup&quot;,&quot;page&quot;:&quot;home&quot;}"></span>
	            <div class="form-search">
	                <div class="btn-search-icon"></div>
	                <input type="search" autocomplete="off" name="query" value="" placeholder="搜歌曲">
	            </div>
	        </div>
	    </div>
	    <div class="nav-wrap">
	        <ul class="sub-nav">
				<li class="log url on"><router-link to="/index">推荐</router-link></li>
				<li class="log url"><router-link to="/types">分类</router-link></li>
				<li class="log url"><router-link to="/listcate">榜单</router-link></li>
				<li class="log url"><router-link to="/singer">歌手</router-link></li>
				<li class="log url"><router-link to="/playList">歌单</router-link></li>
				<li class="log url"><router-link to="/mv">MV</router-link></li>
	        </ul>
	    </div>
	</header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'header'
    }
  }
}
</script>

<style scoped>
	.header{
		display: block;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    z-index: 999;
   		width: 100%;
	}
	.animated {
	    -webkit-animation-duration: .3s;
	    animation-duration: .3s;
	    -webkit-animation-fill-mode: both;
	    animation-fill-mode: both;
	}
	.header .bar {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    -webkit-box-align: stretch;
	    -webkit-align-items: stretch;
	    align-items: stretch;
	    width: 100%;
	    height: 49px;
	    background: #f8f8f8;
	    text-align: center;
	    border-bottom: 1px solid rgba(0,0,0,.05);
	    position: relative;
	}
	.header .bar .left {
	    width: 100px;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    left: 10px;
	}
	.header .bar .title {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    text-align: center;
	    font-weight: 400;
	    width: 100px;
	    position: relative;
	    height: 100%;
	    margin: 0 auto;
	    line-height: 49px;
	    color: #202020;
	}
	.header .bar .right {
	    width: 100px;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    right: 10px;
	}
	.header .nav-wrap {
	    overflow: hidden;
	    height: 40px;
	    background: #fff;
	    position: relative;
	}
	.header .form-search {
	    display: none;
	    position: relative;
	    width: 72px;
	    float: right;
	    margin-top: 13px;

	}
	.header .bar-form .form-search {
	    display: block;
	}
	.header .form-search input {
	    width: 72px;
	    -webkit-border-radius: 12px;
	    border-radius: 12px;
	    height: 24px;
	    -webkit-box-shadow: none;
	    box-shadow: none;
	    -webkit-appearance: none;
	    border: 1px solid #ccc;
	    padding-left: 20px;
	    padding-top: 1px;
	    font-size: 12px;
	    line-height: 24px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.header .form-search .btn-search-icon {
	    position: absolute;
	    top: 4px;
	    left: 4px;
	    background: url(/static/img/ui-header-618.png) no-repeat -68px -33px;
	    -webkit-background-size: 89px 89px;
	    background-size: 89px;
	    width: 18px;
	    height: 18px;
	}
	.header .bar .btn {
	    float: right;
	    display: block;
	    line-height: 40px;
	    padding: 0;
	    margin: 0;
	    border: none;
	    text-shadow: 0 -1px 0 rgba(0,0,0,.25);
	    font-size: 12px;
	    background: 0 0;
	}
	.header .bar .btn-ucenter {
	    display: inline-block;
	    background: url(/static/img/ui-header-618.png) no-repeat -2px -3px;
	    -webkit-background-size: 89px 89px;
	    background-size: 89px;
	    width: 28px;
	    height: 29px;
	    margin: 10px 0;
	}
	.header .sub-nav {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: start;
	    -webkit-justify-content: flex-start;
	    justify-content: flex-start;
	    -webkit-box-align: stretch;
	    -webkit-align-items: stretch;
	    align-items: stretch;
	    color: #4a576c;
	    white-space: nowrap;
	}
	.header .sub-nav li{
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    text-align: center;
	    line-height: 40px;
	    height: 38px;
	}
	.header .sub-nav li a{
		color: #4a576c;
		text-decoration: none;
		display: inline-block;
    	height: 38px;
	}	
	.router-link-active{
		border-bottom: 3px solid #299DE7;
	    color: #299DE7;
	}
</style>
