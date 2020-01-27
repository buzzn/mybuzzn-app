const GlobalChallengeState = () => {
  const storeKey = 'globalChallenge';

  let state = {
    totalPrognose: 0,
    benchmark: 0,
    prognose: 0,
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

  return {
    state,
    get,
    set,
  };
};

export default GlobalChallengeState();
