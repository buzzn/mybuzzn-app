import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Meta from '@/pages/Meta';
import MyBuzzn from '@/pages/MyBuzzn';
import OurBuzzn from '@/pages/OurBuzzn';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';
import Error from '@/pages/Error';
import AuthState from '../states/AuthState';
import APIService from '../services/APIService';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/register/:email',
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
    {
      path: '/error/:number',
      name: 'Error',
      component: Error,
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
      APIService.auth({
        user: AuthState.get('user'),
        password: AuthState.get('password'),
      })
        .then(() => next())
        .catch(() => next({
          name: 'Login',
          params: { nextUrl: to.fullPath },
        }));
    }
  } else {
    next();
  }
});

export default router;
