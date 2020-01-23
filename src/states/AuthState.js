const AuthState = () => {
  const storeKey = 'auth';
  const initState = {
    user: null,
    password: null,
    token: null,
    loggedIn: false,
    role: null,
    demo: false,
  };
  let state = initState;

  const boot = () => {
    const raw = localStorage.getItem(storeKey);
    if (raw) {
      const data = JSON.parse(raw);
      state = data;
    }
  };
  boot();

  const store = () => {
    localStorage.setItem(storeKey, JSON.stringify(state));
  };

  const set = (key, data) => {
    state[key] = data;
    store();
  };

  const get = key => state[key];

  const destroy = () => {
    localStorage.removeItem('auth');
  };

  return {
    state,
    get,
    set,
    destroy,
  };
};

export default AuthState();
