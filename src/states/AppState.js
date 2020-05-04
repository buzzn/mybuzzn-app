const AppState = () => {
  const storeKey = 'app';

  let state = {
    offline: false,
    loading: true,
  };

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
    localStorage.removeItem(storeKey);
  };

  return {
    state,
    get,
    set,
    destroy,
  };
};

export default AppState();
