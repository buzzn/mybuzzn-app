import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Meta from '@/pages/Meta';
import MyBuzzn from '@/pages/MyBuzzn';
import OurBuzzn from '@/pages/OurBuzzn';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';
import AuthState from '../states/AuthState';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        withoutAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        withoutAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'MyBuzzn',
      component: MyBuzzn,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/mybuzzn',
      name: 'OurBuzzn',
      component: OurBuzzn,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/meta/:slug',
      name: 'Meta',
      component: Meta,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthState.get('loggedIn')) {
      // no token found, then redirect to login page
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.withoutAuth)) {
    if (!AuthState.get('loggedIn')) {
      // no token found, then show page
      next();
    } else {
      next({
        name: 'MyBuzzn',
      });
    }
  } else {
    next();
  }
});

export default router;
