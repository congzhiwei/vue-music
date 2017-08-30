<template>
	<div class="mod-tj">
	    <div class="hd">好歌推荐</div>
	    <div class="container">
	        <div class="songlist clearfix">
	            <div class="card url normal log" v-for="item of jData" v-bind:sid="item.sid" @click="play($event)">
	                <div class="poster">
	                    <img v-bind:src="item.picUrl" alt="">
	                    <span class="btn-play ui-icon-play url normal"></span>
	                </div>
	                <div class="info">
	                    <div class="name">{{item.title}}</div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
//import Bus from '../../bus.js'
import { mapMutations, mapGetters } from 'Vuex'
export default {
  name: 'Jrtj',
  data () {
    return {
      jData: [],
      sData: {}
    }
  },
  computed: {
  	...mapGetters([
        'openPlayer',
        'url',
        'picUrl',
        'title',
        'singer',
        'id',
        'songsList'
    ])
  },
  created () {
    let This = this
    this.$http.get('jrtj.json',
      {
        emulateJSON: true
      }
    ).then((response) => {
      if (response.data.code === 0) {
        This.jData = response.data.data
      } else {
        alert(response.data.message)
      }
    }).catch(function (response) {
    })
  },
  methods: {
    play (event,index) {
		let This = this
		let sid = parseInt(event.currentTarget.getAttribute('sid'))
		this.$store.commit('setId',sid);

		let songsList = this.songsList
		var idx = -1
		for(let i = 0; i < songsList.length; i++){
			if(songsList[i].sid == sid){
				idx = i
			}
		}
		if(idx == -1){
			idx = songsList.length
		}
		this.$store.commit('setListIndex',idx)
    }
  }
}
</script>

<style scoped>
	.ui-icon-play {
	    background-image: url(//static0.qianqian.com/web/st/img/sprite/ui-icon-fd5.png);
	    display: inline-block;
	    background-repeat: no-repeat;
	    width: 36px;
	    height: 36px;
	    -webkit-background-size: 142px 112px;
	    background-size: 142px 112px;
	    background-position: -10px -10px;
	}
	.hd {
	    margin: 14px 0 18px 0;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	}
	.mod-tj .hd {
	    display: block;
	    font-weight: 700;
	    font-size: 20px;
	    margin-top: 14px;
	}
	.mod-tj .container {
	    margin: 0 -5px;
	}
	.mod-tj .container .songlist {
	    margin-bottom: 50px;
	}
	.mod-tj .card {
	    width: 33.3%;
	    float: left;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    padding: 0 5px 20px;
	}
	.card .poster {
	    position: relative;
	    height: 0;
	    padding-bottom: 100%;
	}
	.card .poster img {
	    border: 1px solid #eee;
	}
	.card .info {
	    font-size: 12px;
	    overflow: hidden;
	    white-space: normal;
	    margin-top: 4px;
	    line-height: 16px;
	}
	.poster .btn-play {
	    position: absolute;
	    bottom: 5px;
	    right: 5px;
	    width: 28px;
	    height: 28px;
	    background: url(//static0.qianqian.com/web/st/img/sprite/ui-list-a9d.png) no-repeat -74px -61px;
	    -webkit-background-size: 238px 188px;
	    background-size: 238px 188px;
	}
	.card .info .name {
	    width: 100%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
</style>
