<template>
    <div class="player-box">
        <div class="header">
            <div class="back">
            </div>
            <div class="title">
                <h1 class="song-name">{{title}}</h1>
                <span class="artist">{{singer}}</span>
            </div>
            <div class="forwarding"></div>
        </div>
        <div class="song-main">
            <div class="middle-box">
                <div class="player-needle" :class="{'pause' : !isPlay}"></div>
                <div class="pic-box" ref="picBox"  :style="{transform:transform}">
                    <div class="picB" ref="picb" :class="{'animation' : isPlay}">
                        <img :src="picUrl" alt="" class="album-pic">
                        <div class="pos">
                        
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="option-box">
            <div class="progress-bar">
                <div class="current-time">{{curTime}}</div>
                <div class="progress-box">
                    <div class="progress" ref="progress">
                        <div class="cur-progress" v-bind:style="{width: barWidth + '%' }"></div>
                        <div class="idot" v-bind:style="{left: barWidth + '%'}" @touchstart.stop="touchstart" @touchmove.stop="touchmove" @touchEnd.stop="touchEnd"></div>
                    </div>
                </div>
                <div class="left-time">{{duration}}</div>
            </div>
            <div class="option-2">
                <div class="iconfont icon-loop">
                </div>
                <div class="iconfont icon-prev" @click.stop="prev">
                </div>
                <div class="iconfont icon-play-pause" v-on:click.stop="play" v-bind:class="{ 'icon-stop' : isPlay, 'icon-play': !isPlay}">
                </div>
                <div class="iconfont icon-next" @click.stop="next">
                </div>
                <div class="iconfont icon-list" @click.stop="openSongList">
                </div>
            </div>
        </div>
        <div class="bg" :style="{backgroundImage:'url('+ picUrl +')'}"></div>
        <div class="bg2"></div>
    </div>    
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex' 

    export default {
        name:'PlayerBox',
        data(){
            return {
                transform:0,
                touchStartX:0
            }
        },
        computed: {
            ...mapGetters([
                'isHeader',
                'title',
                'singer',
                'picUrl',
                'duration',
                'curTime',
                'barWidth',
                'isPlay',
                'changeTime',
                'durationFormat',
                'isSongList',
                'songsList',
                'listIndex'
            ])
        },
        mounted(){
            this.$store.commit('setIsHeader',false);
            this.progressLength = this.$refs.progress.getBoundingClientRect().width;
        },
        watch:{
            isPlay(){
                let imageTrans = getComputedStyle(this.$refs.picb).transform
                let transform = getComputedStyle(this.$refs.picBox).transform
                this.transform = transform === 'none' ? imageTrans : imageTrans.concat('', transform)
            }
        },
        methods:{
            play(){
                if( this.isPlay ) {
                    this.$store.commit('setIsPlay',false);        
                }else {
                    this.$store.commit('setIsPlay',true);
                }
            },
            touchstart(e){
                
            },
            touchmove(e){
                let movementX = e.touches[0].pageX-this.touchStartX;
                let curLength = this.$refs.progress.getBoundingClientRect().width;
                let offsetLeft = this.$refs.progress.offsetLeft;
                let newPercent = ((e.touches[0].pageX-offsetLeft)/this.progressLength ) * 100

                newPercent = newPercent>100?100:newPercent<0?0:newPercent

                this.$store.commit('setBarWidth',newPercent);
                
                let curTime = this.durationFormat * ( newPercent * 0.01 );
                this.$store.commit('setChangeTime', curTime);
            },
            openSongList(){
                this.$store.commit('setIsSongList',true)
            },
            prev(){
                if(this.listIndex != -1 && this.songsList.length >0){
                    var sid;
                    if(this.listIndex > 0){
                        sid = this.songsList[this.listIndex-1].sid
                        this.$store.commit('setListIndex',this.listIndex-1)
                    }else{
                        sid = this.songsList[this.songsList.length-1].sid
                        this.$store.commit('setListIndex',this.songsList.length-1)
                    }
                    this.$store.commit('setId',sid)
                }
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
        padding-top: 55px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
    .player-box .header {
        position: fixed;
        top: 0;
        left: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 100;
        width: 100%;
        height: 50px;
        color: #ffffff;
    }
    .player-box .header:after {
        content: '';
        position: fixed;
        left: 0;
        top: 50px;
        background: rgba(255,255,255,0.3);
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
    .player-box .header .title {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-top: 10px;
        font-size: 16px;
        text-align: center;
        line-height: 18px !important;
        overflow: hidden;
    }
    .player-box .header .title .song-name {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        font-weight: normal;
    }
    .player-box .header .title .artist {
        font-size: 12px;
        color: #fff;
    }
    .player-box .song-main {
        width: 100%;
        height: 75%;
        overflow: hidden;
        position: relative;
    }
    .player-box .middle-box {
        overflow: hidden;
    }
    .player-box .song-main .player-needle {
        width: 90px;
        height: 140px;
        position: absolute;
        top: -14px;
        left: 50%;
        z-index: 20;
        background-image: url(/static/img/player-needle.5bc69c1.png);
        background-size: cover;
        -webkit-transform: translate3d(-16px, 0, 0);
        transform: translate3d(-16px, 0, 0);
        -webkit-transform-origin: 14px 16px;
        transform-origin: 14px 16px;
        transition: all 0.3s;
    }
    .player-box .song-main .player-needle.pause{
        -webkit-transform: translate3d(-16px, 0, 0) rotateZ(-35deg);
        transform: translate3d(-16px, 0, 0) rotateZ(-35deg);
    }
    .player-box .song-main .pic-box {
        position: relative;
        width: 70%;
        height: 0;
        padding-bottom: 70%;
        border-radius: 50%;
        border: 10px solid rgba(255,255,255,0.2);
        margin: 0 auto;
        margin-top: 50px;
        text-align: center;
    }
    .player-box .song-main .pic-box .album-pic {
        width: 75%;
        height: auto;
        max-height: 250px;
        border-radius: 50%;
        margin-top: 15%;
    }
    .player-box .song-main .pic-box div.picB{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .player-box .song-main .pic-box div.pos {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: url(/static/img/coverall.b03499a.png) no-repeat;
        background-size: 100%;
        z-index: 10;
        left: 50%;
        top: 50%;
        margin-left: -50%;
        margin-top: -50%;
    }
    .player-box .song-main .option-1 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 80%;
        padding: 10px 0;
        margin: 20px auto;
    }
    .player-box .bg {
        position: fixed;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -2;
        background-position: center top;
        background-size: cover;
        background-attachment: fixed;
        -webkit-filter: blur(30px);
        -moz-filter: blur(30px);
        -ms-filter: blur(30px);
        -o-filter: blur(30px);
        filter: blur(30px);
    }
    .player-box .bg2 {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.6);
        z-index: -1;
    }
    .player-box .option-box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .player-box .option-box .progress-bar {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-bottom: 20px;
    }
    .player-box .option-box .progress-bar .current-time, .player-box .option-box .progress-bar .left-time {
        width: 70px;
        text-align: center;
        font-size: 13px;
        line-height: 25px;
        color: #ffffff;
    }
    .player-box .option-box .progress-bar .progress-box {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .player-box .option-box .progress-bar .progress-box .progress {
        width: 100%;
        background: #ffffff;
        margin-top: 10px;
        height: 2px;
    }
    .player-box .option-box .progress-bar .progress-box .progress .cur-progress {
        width: 20%;
        height: 100%;
        background: #D23023;
    }
    .player-box .option-box .progress-bar .progress-box .progress .idot {
        width: 16px;
        height: 16px;
        position: relative;
        border-radius: 50%;
        background-color: #fff;
        top: -9px;
    }
    .player-box .option-box .option-2 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
    }
    .player-box .option-box .option-2 div {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        padding: 20px 0;
    }
    .player-box .song-main .picB.animation{
        animation: rotate 25s linear 0s infinite normal none;
    }
    .iconfont {
        color:#FFF;
        font-size:30px;
    }
    .icon-play,.icon-play-pause{
        font-size: 46px;
    }
    .icon-loop:before {
        content: "\e606";
    }
    .icon-prev:before {
        content: "\e607";
    }
    .icon-play:before {
        content: "\e616";
    }
    .icon-stop:before {
        content: "\e617";
    }
    .icon-next:before {
        content: "\e60a";
    }
    .icon-list:before {
        content: "\e603";
    }
    .icon-favor:before {
        content: "\e608";
    }
    .icon-download:before {
        content: "\e60b";
    }
    

    @keyframes rotate{
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    
</style>