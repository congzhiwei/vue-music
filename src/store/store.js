import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		isHeader:true,
		playing:{
			id:null,
			isPlay:false,
			title:'',
			singer:'',
			url:'',
			lyric:'',
			songsList:[],
			listIndex:-1,
			picUrl:null,
			curTime:0,
			duration:0,
			durationFormat:0,
			openPlayer:false,
			barWidth:0,
			changeTime:0,
			isSongList:false
		}
	},
	getters: {
		isHeader:state => state.isHeader,
		id:state => state.playing.id,
		isPlay: state => state.playing.isPlay,
		title: state => state.playing.title,
		singer: state => state.playing.singer,
		url: state => state.playing.url,
		lyric: state => state.playing.lyric,
		songsList: state => state.playing.songsList,
		listIndex: state => state.playing.listIndex,
		picUrl: state => state.playing.picUrl,
		curTime: state => state.playing.curTime,
		duration: state => state.playing.duration,
		durationFormat: state => state.playing.durationFormat,
		openPlayer: state => state.playing.openPlayer,
		barWidth: state => state.playing.barWidth,
		changeTime: state => state.playing.changeTime,
		isSongList: state => state.playing.isSongList
	},
	mutations: {
		setIsHeader: (state,isHeader) => { state.isHeader = isHeader },
		setId: (state,id) => { state.playing.id = id },
		setIsPlay: (state,isPlay) => { state.playing.isPlay = isPlay },
		setTitle: (state,title) => { state.playing.title = title },
		setSinger: (state,singer) => { state.playing.singer = singer },
		setUrl: (state,url) => { state.playing.url = url },
		setLyric: (state,lyric) => { state.playing.lyric = lyric },
		setSongsList: (state,songsList) => { state.playing.songsList = songsList },
		setListIndex: (state,listIndex) => { state.playing.listIndex = listIndex },
		setPicUrl: (state,picUrl) => { state.playing.picUrl = picUrl },
		setCurTime: (state,curTime) => { state.playing.curTime = curTime },
		setDuration: (state,duration) => { state.playing.duration = duration },
		setDurationFormat: (state,durationFormat) => { state.playing.durationFormat = durationFormat },
		setOpenPlayer: (state,openPlayer) => { state.playing.openPlayer = openPlayer },
		setBarWidth: (state,barWidth) => { state.playing.barWidth = barWidth },
		setChangeTime: (state,changeTime) => { state.playing.changeTime = changeTime },
		setIsSongList: (state,isSongList) => { state.playing.isSongList = isSongList }
	}
});