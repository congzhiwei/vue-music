import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Types from '@/components/types/Types'
import PlayList from '@/components/playList/PlayList'
import Singer from '@/components/singer/Singer'
import Listcate from '@/components/listcate/Listcate'
import Mv from '@/components/mv/Mv'
import PlayerBox from '@/components/base/PlayerBox'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
		path: '*',
		name: 'index',
		component: Index
    },
    {
    	path: '/types',
      	name: 'types',
      	component: Types
    },
    {
    	path: '/playList',
      	name: 'playList',
      	component: PlayList
    },{
    	path: '/singer',
      	name: 'singer',
      	component: Singer
    },{
    	path: '/listcate',
      	name: 'listcate',
      	component: Listcate
    },
    {
    	path: '/mv',
      	name: 'mv',
      	component: Mv
    },
    {
      path: '/playerBox',
        name: 'playerBox',
        component: PlayerBox
    }
  ]
})
