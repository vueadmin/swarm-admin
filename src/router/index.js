import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: '看板', icon: 'dashboard' }
  //     }
  //   ]
  // },

  {
    path: '/task',
    component: Layout,
    redirect: '/task/index',
    name: 'Task',
    meta: { title: '监测任务管理', icon: 'dashboard' },
    children: [
      {
        path: 'index',
        name: 'TaskIndex',
        component: () => import('@/views/task/index'),
        meta: { title: '监测任务管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/point',
    component: Layout,
    redirect: '/point/index',
    name: 'Point',
    meta: { title: '监测点及人员管理', icon: 'el-icon-tickets' },
    children: [
      {
        path: 'index',
        name: 'PointIndex',
        component: () => import('@/views/point/index'),
        meta: { title: '监测点及人员管理', icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/record/index',
    name: 'Record',
    meta: { title: '历史数据', icon: 'el-icon-collection-tag' },
    children: [
      // {
      //   path: 'index',
      //   name: 'RecordIndex',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: '历史数据', icon: 'el-icon-s-help' }
      // },
      {
        path: 'download',
        name: 'RecordDownload',
        component: () => import('@/views/download/index'),
        meta: { title: '历史数据', icon: 'el-icon-collection-tag' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-monitor' },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user' }
      },
      {
        path: 'rule',
        name: 'SystemRule',
        component: () => import('@/views/rule/index'),
        meta: { title: '角色管理', icon: 'el-icon-female' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/index',
    name: 'Data',
    meta: { title: '数据上报', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'DataIndex',
        component: () => import('@/views/data/index'),
        meta: { title: '数据上报', icon: 'el-icon-s-help' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
