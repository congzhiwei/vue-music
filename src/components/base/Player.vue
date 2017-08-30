<template>
    <div class="player-box" v-show="openPlayer" v-on:click="openPlayerBox">
        <div class="player-minibar url">
            <div class="ui-blur"></div>
            <div class="minibar-progress">
                <div class="bar" v-bind:style="{ width: barWidth +'%' }"></div>
            </div>
            <div class="player">
                <img alt="Romantic Piano Song Masters,Taylor Swift" v-bind:src="picUrl">

                <div class="info">
                    <span class="title">{{title}}</span>
                    <span class="name">{{singer}}</span>
                </div>
                <ul class="action">
                    <li class="iconfont play" v-on:click.stop="play" v-bind:class="{ 'icon-stop' : isPlay, 'icon-play': !isPlay}"></li>
                    <li class="iconfont icon-next" @click.stop="next"></li>
                    <li class="iconfont icon-list" @click.stop="openSongList"></li>
                </ul>
            </div>
        </div>
        <audio style="display:none;" preload="true" controls="controls" :src="url" ref="audio" id="player" @canplay="startPlay" @timeupdate="timeupdate" @ended="ended"></audio>
    </div>
    
</template>

<script>
//import Bus from '../../bus.js'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Player',
  data: function () {
    return {
      //currentTime: 0,
      //duration: this.$store.state.playing.duration,
      //barWidth: 0
      /*,
      song: {
        url: 'http://m10.music.126.net/20170821173750/43f06a2e8dd08db8f2c9c6ab59e4b9e6/ymusic/6e01/a4d4/bbef/2dda07904eb54d44abb278165e1c6ead.mp3',
        imgUrl: 'http://musicdata.baidu.com/data2/pic/fc2c1edc56b19641072fa9753b4b6bfe/309872378/309872378.jpg@s_0,w_90',
        title: 'Blank Space (Piano Version) - Single',
        singer: 'Romantic Piano Song Masters,Taylor Swift'
      }*/
    }
  },
  /*computed: mapState({
    openPlayer: state => state.playing.openPlayer,
    url: state => state.playing.openPlayer,
    picUrl : state => state.playing.picUrl,
    title : state => state.playing.title,
    singer : state => state.playing.singer
  }),*/
  computed: {
    ...mapGetters([
        'openPlayer',
        'url',
        'picUrl',
        'title',
        'singer',
        'id',
        'isPlay',
        'duration',
        'durationFormat',
        'curTime',
        'barWidth',
        'changeTime',
        'songsList',
        'isSongList',
        'listIndex'       
    ])
  },
  mounted () {
    /*let This = this
    Bus.$on('getTarget', function (sData) {
      This.song = sData
      This.$options.methods.play.bind(This)()
    })*/
  },
  watch: {
    isPlay(){
        this.togglePlay()
    },
    id(){
        this.$store.commit('setBarWidth',0)
        this.getSong()
    },
    changeTime(){
        player.currentTime = this.changeTime;
    },
    curTime(){
        let barWidth = player.currentTime / player.duration * 100
        this.$store.commit('setBarWidth',barWidth)
    }
  },
  methods: {
    getSong(){
        let This = this
        let sid = this.id

        this.$http.get('musicList.json',{
            emulateJSON: true
        }).then((response) => {
        if (response.data.code === 0) {
            let data = response.data.data
            This.$store.commit('setUrl',data[sid].url)
            This.$store.commit('setPicUrl',data[sid].picUrl)
            This.$store.commit('setTitle',data[sid].title)
            This.$store.commit('setSinger',data[sid].singer)

            if(this.$route.name != 'playerBox'){
                This.$store.commit('setOpenPlayer',true)
            }else{
                This.$store.commit('setOpenPlayer',false)
            }

            this.addSongList(data);
        } else {  
        }
        }).catch(function (response) {
        })
    },
    addSongList(data){
        let sid = this.id
        let songList = {}
        songList.sid = sid;
        songList.url = data[sid].url
        songList.picUrl = data[sid].picUrl
        songList.title = data[sid].title
        songList.singer = data[sid].singer

        let list = this.songsList
        let count = 0
        for(let value of list){
            if(value.sid == sid){
                count++
            }
        }

        if(count == 0){
            list.push(songList)
        }
        
        this.$store.commit('setSongsList',list)
    },
    play(){
        if( this.isPlay ) {
            this.$store.commit('setIsPlay',false);
        }else {
            this.$store.commit('setIsPlay',true);
        }
    },
    togglePlay() {
        var player = document.getElementById('player');
        if(this.isPlay){
            player.play()
        }else{
            player.pause()
        }
      /*let This = this
      let getMenuText = this.$refs.audio
      if (!this.isA) {
        if (!getMenuText.src) {
          getMenuText.src = This.song.url
        }
        getMenuText.play()
      } else {
        getMenuText.pause()
      }
      this.isA = !this.isA
      getMenuText.onloadedmetadata = function () {
        This.setTimeShow(getMenuText)
      }*/
    },
    /*setTimeShow(audio) {
      let This = this
      this.duration = This.secondToMin(audio.duration)

      setInterval(function () {
        This.currentTime = This.secondToMin(audio.currentTime)
        This.barWidth = audio.currentTime / audio.duration * 100
      }, 50)
    },*/
    secondToMin(s) {
      let MM = Math.floor(s / 60)
      let SS = s % 60
      if (MM < 10) {
        MM = '0' + MM
      }
      if (SS < 10) {
        SS = '0' + SS
      }
      let min = MM + ':' + SS
      return min.split('.')[0]
    },
    startPlay(){
        player.play()
        let duration = this.secondToMin(player.duration)
        this.$store.commit('setDuration',duration)
        this.$store.commit('setIsPlay',true)
        this.$store.commit('setDurationFormat',player.duration)
    },
    ended(){
        this.$store.commit('setIsPlay',false)
    },
    timeupdate(){
        let currentTime = this.secondToMin(player.currentTime)
        this.$store.commit('setCurTime',currentTime)
    },
    openPlayerBox(){
        this.$router.push({path: 'playerBox'})
    },
    openSongList(){
        this.$store.commit('setIsSongList',true)
    },
    next(){
        if(this.listIndex != -1 && this.songsList.length >0){
            var sid;
            if(this.listIndex < this.songsList.length-1){
                sid = this.songsList[this.listIndex+1].sid
                this.$store.commit('setListIndex',this.listIndex+1)
            }else{
                sid = this.songsList[0].sid
                this.$store.commit('setListIndex',0)
            }
            this.$store.commit('setId',sid)
        }
    }
  }
}
</script>

<style scoped>
    .player-box {
        width: 100%;
        height: 70px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: block;
        z-index: 999;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .player-box .ring, .player-box .url {
        height: 100%;
    }
    .player-box .ui-blur {
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 100%;
        background: rgba(247,247,247,.96);
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        z-index: 1;
        overflow: hidden;
    }
    .player-box .minibar-progress {
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #e8e8e8;
        top: 0;
        z-index: 3;
    }
    .minibar-progress .bar {
        width: 0;
        height: 100%;
        background: #00a8ff;
    }
    .player {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        padding-left: 16px;
        padding-right: 16px;
        height: 100%;
        width: 100%;
        z-index: 2;
    }
    .player img {
        width: 50px;
        height: 50px;
        margin-right: 9px;
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,.2);
        box-shadow: 0 0 5px rgba(0,0,0,.2);
    }
    .player .info {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        font-size: 12px;
        padding-right: 8px;
    }
    .player .info .name,.player .info .title {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        line-height: 13px;
    }
    .player .info .title {
        font-size: 15px;
        font-weight: 700;
        line-height: 18px;
        margin-bottom: 5px;
    }
    .player .info .name {
        display: block;
        color: #999;
    }
    .player .action {
        line-height: 70px;
        height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        position: relative;
    }
    .player .action .play {
        font-size: 40px;
    }
    .player .action li {
        display: inline-block;
        font-size: 25px;
    }
    .icon-play:before {
        content: "\e616";
    }
    .icon-next:before {
        content: "\e60a";
    }
    .icon-list:before {
        content: "\e603";
    }
    .icon-stop:before {
        content: "\e617";
    }
</style>
