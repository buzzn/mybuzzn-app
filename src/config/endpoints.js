export const demoEndpoints = {
  register: './static/dummy-data/register.json',
  demo: './static/dummy-data/signin.json',
  signin: './static/dummy-data/signin.json',
  profile: './static/dummy-data/profile.json',
  hitlist: './static/dummy-data/hitlist.json',
  devicelist: './static/dummy-data/devicelist.json',
  advices: './static/dummy-data/advices.json',
  challenges: './static/dummy-data/challenges.json',
  challengeStatus: './static/dummy-data/challengeStatus.json',
  consumptionHistory: './static/dummy-data/consumptionHistory.json',
};

const apiBase = 'http://mybuzzn-backend.buzzn.net';
export const prodEndpoints = {
  register: './static/dummy-data/register.json',
  demo: './static/dummy-data/signin.json',
  signin: `${apiBase}/login`,
  profile: `${apiBase}/profile`,
  hitlist: './static/dummy-data/hitlist.json',
  devicelist: './static/dummy-data/devicelist.json',
  advices: './static/dummy-data/advices.json',
  challenges: './static/dummy-data/challenges.json',
  challengeStatus: './static/dummy-data/challengeStatus.json',
  consumptionHistory: './static/dummy-data/consumptionHistory.json',
};
