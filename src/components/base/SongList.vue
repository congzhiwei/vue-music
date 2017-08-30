<template>
	<div class="songList">
		<div class="content">
			<div class="title">
				<div class="play-type">
					<i class="icon-music-shunxu"></i>
					<span>播放列表</span>
					<span>({{num}})</span>
				</div>
				<div class="right">
					<div class="collect">
						<i class="icon-add-project"></i>
						<span>收藏</span></div>
					<div class="delete">
						<i class="icon-delete"></i>
						span>清空</span>
					</div>
				</div>
				<div class="border-1px"></div>
			</div>
			<ul class="container">

				<li class="list" v-for="(item,index) of songsList" @click="play($event,index)" v-bind:sid="item.sid">
					<div class="border-1px"></div>
					<i class="playingicon icon-volume-medium" v-if="id == item.sid"></i>
						<span class="name">{{item.title}}</span>
						<span class="singer"> - {{item.singer}}</span>
					<i class="close"></i>
					<div class="border-1px"></div>
				</li>
			</ul>
		</div>
		<div class="mask" @click="closeSongList"></div>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'

	export default {
		name:'SongList',
		data(){
			return {
				num:0
			}
		},
		computed: {
	    	...mapGetters([
	    		'id',
				'songsList',
				'isSongList',
				'listIndex'
			])
		},
		watch:{
			
		},
		mounted(){
			this.num = this.songsList.length
		},
		methods:{
			closeSongList(){
				let This = this
				setTimeout(function(){
					This.$store.commit('setIsSongList',false)
				},250)
			},
			play(event,index){
				let sid = parseInt(event.currentTarget.getAttribute('sid'))
				this.$store.commit('setId',sid)
				this.closeSongList()
				this.$store.commit('setListIndex',index) 
			}
		}
	}
</script>

<style scoped>
	.songList {
		position: fixed;
		z-index: 1000;
	}
	.songList .content {
	    position: fixed;
	    height: 307px;
	    background: #fff;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    z-index: 22;
	    -webkit-transform: translateY(307px);
    	-webkit-transition: all 250ms;
	}
	.songList.show .mask{
		display:block;
	}
	.songList.show .content{
		-webkit-transform: translateY(0);
	}
	.songList .content .title {
	    width: 100%;
	    position: relative;
	    height: 50px;
	    font-size: 0;
	}
	.songList .content .title .play-type {
	    height: 100%;
	}
	.songList .content .title .play-type, .songList .content .title .collect, .songList .content .title .delete {
	    display: inline-block;
	    width: auto;
	    height: 100%;
	    line-height: 50px;
	    padding: 0 15px;
	}
	.songList .content .title .play-type i {
	    color: #666;
	    font-size: 18px;
	    display: inline-block;
	    width: 20px;
	    height: 20px;
	    vertical-align: middle;
	}
	.songList .content .title .play-type span {
	    color: #666;
	    vertical-align: middle;
	    font-size: 14px;
	    font-weight: 300;
	}
	.songList .content .title .right {
	    float: right;
	    height: 100%;
	    line-height: 50px;
	}
	.songList .content .container {
	    height: calc(100% - 50px);
	    margin: 0;
	    padding: 0;
	    overflow: scroll;
	    -webkit-overflow-scrolling: touch;
	    box-sizing: border-box;
	}
	.songList .content .container .list {
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    height: 42px;
	    line-height: 42px;
	    padding: 0 15px;
	    font-weight: 400;
	    font-size: 14px;
	    color: #666;
	    overflow: hidden;
	}
	.playingicon{
		display: inline-block;
	    width: 12px;
	    height: 12px;
	    margin-right: 12px;
	    background: url(//static0.qianqian.com/web/st/img/ui/list/play-state-aa7.gif) no-repeat 0 0;
	    -webkit-background-size: 12px 12px;
	    background-size: 12px;
	}
	.border-1px {
	    position: relative;
	}
	.border-1px:after {
	    display: block;
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    width: 100%;
	    border-top: 1px solid rgba(7,17,27,0.1);
	    content: ' ';
	}

	.songList .mask {
		display:none;
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 21;
	    opacity: 1;
	    background: rgba(0,0,0,0.5);
	}

</style> 