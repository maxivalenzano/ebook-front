import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
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
    component: () => import('../views/Profile.vue')
  },
  {
    path: "/ebooks",
    alias: "/libros",
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
    component: () => import("../components/AddEbook")
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

  // redirigimos a la página de inicio de sesión
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
