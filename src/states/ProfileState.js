const ProfileState = () => {
  const storeKey = 'profile';

  let state = {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    email: null,
    avatar: null,
    flatSize: 0,
    flatPopulation: 0,
    meterId: '',
    baselineState: '',
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

export default ProfileState();
