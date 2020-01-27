import AuthState from '../states/AuthState';

export const errorHandling = (status, router) => {
  switch (status) {
    case 401:
      AuthState.set('loggedIn', false);
      AuthState.set('token', null);
      AuthState.destroy();
      router.push({ path: '/login' });
      break;
    default:
      router.push({ path: '/error/400' });
      break;
  }
};

export default {
  errorHandling,
};
