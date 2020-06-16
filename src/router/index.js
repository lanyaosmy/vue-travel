import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store.js'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true //使用props
    },
    {
        path: '/todo',
        name: 'Todo',
        component: () =>
            import(/* webpackChunkName: "todo" */ '../views/Todos.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () =>
            import(/* webpackChunkName: "user" */ '../views/User.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () =>
            import(/* webpackChunkName: "invoice" */ '../views/Invoice.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "user" */ '../views/Login.vue')
    },
    {
        path: '/detail/:slug',
        name: 'detail',
        props: true,
        component: () =>
            import(/* webpackChunkName: "detail" */ '../views/Details.vue'),
        children: [
            {
                path: ':experienceSlug',
                name: 'experience',
                props: true,
                component: () =>
                    import(
                        /* webpackChunkName: "experience" */ '../views/Experience.vue'
                    )
            }
        ],
        beforeEnter: (to, from, next) => {
            const exists = store.destinations.find(
                destination => destination.slug === to.params.slug
            )
            if (exists) {
                next()
            } else {
                next({ name: 'notFound' })
            }
        }
    },
    {
        path: '/404',
        alias: '*',
        name: 'notFound',
        component: () =>
            import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'vue-active-class',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            const position = {}
            if (to.hash) {
                position.selector = to.hash
                if (to.hash === '#experience') {
                    position.offset = { y: 250 }
                }
                if (document.querySelector(to.hash)) {
                    return position
                }
                return false
            }
        }
    },
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.user) {
            next({ name: 'login', query: { redirect: to.fullPath } })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
