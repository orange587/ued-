import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import ListUiix from '@/page/list_uiix'
import ListPc from '@/page/list_pc'
import ListBanner from '@/page/list_banner'
import ListDesignStandard from '@/page/list_design_standard'
import ListSiteNavigation from '@/page/list_site_navigation'
import ListH5 from '@/page/list_h5'
import DetailShare from '@/page/detail_share'
import DetailShareUiix from '@/page/detail_share_uiix'
// import Page404 from '@/page/page404'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: Index,
            meta: {
                title: '首页'
            }
        },
        {
            path: '/list_uiix',
            name: 'list_uiix',
            component: ListUiix,
            meta: {
                title: 'UI/IX'
            }

        },
        {
            path: '/list_pc',
            name: 'list_pc',
            component: ListPc,
            meta: {
                title: 'PCz专题'
            }
        },
        {
            path: '/list_banner',
            name: 'list_banner',
            component: ListBanner,
            meta: {
                title: 'Banner'
            }
        },
        {
            path: '/list_design_standard',
            name: 'list_design_standard',
            component: ListDesignStandard,
            meta: {
                title: '设计规范'
            }
        },
        {
            path: '/list_site_navigation',
            name: 'list_site_navigation',
            component: ListSiteNavigation,
            meta: {
                title: '网址导航'
            }
        },
        {
            path: '/list_h5',
            name: 'list_h5',
            component: ListH5,
            meta: {
                title: 'H5'
            }
        },
        {
            path: '/detail_share/:id',
            name: 'detail_share',
            component: DetailShare,
            meta: {
                title: '详情'
            },
        },
        {
            path: '/detail_share_uiix/:id',
            name: 'detail_share_uiix',
            component: DetailShareUiix,
            meta: {
                title: 'uiix详情'
            },
        },
        { path: '*', redirect: '/' }
        // {
        //     path: '/list_hand_drawing',
        //     name: 'list_hand_drawing',
        //     component: ListHandDrawing
        // },

        // { path: '*', component: Page404 }
    ]
})