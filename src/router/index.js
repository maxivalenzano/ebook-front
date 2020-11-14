import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

Vue.use(VueRouter)

const routes = [
// {
//   path: '/',
//    name: 'home',
//    component: Home
//  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/mod',
    name: 'moderator',
    // lazy-loaded
    component: () => import('../views/BoardModerator.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('../views/BoardUser.vue')
  },
  {
    path: "/",
    alias: "/ebooks",
    name: "ebooks",
    component: () => import("../components/EbooksList")
  },
  {
    path: "/ebooks/:id",
    name: "ebook-details",
    component: () => import("../components/Ebook")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/UploadFiles")
  },
  {
  path: "/list",
  name: "list",
  component: () => import("../components/List")
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
