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
  globalChallenge: './static/dummy-data/globalChallenge.json',
  individualChallenge: './static/dummy-data/individualChallenge.json',
  ourConsumptionHistroy: './static/dummy-data/ourConsumptionHistroy.json',
};

const apiBase = 'http://mybuzzn-backend.buzzn.net';
export const prodEndpoints = {
  register: `${apiBase}/set-password`,
  demo: './static/dummy-data/signin.json',
  signin: `${apiBase}/login`,
  profile: `${apiBase}/profile`,
  hitlist: './static/dummy-data/hitlist.json',
  devicelist: `${apiBase}/individual-disaggregation`,
  advices: './static/dummy-data/advices.json',
  challenges: './static/dummy-data/challenges.json',
  challengeStatus: './static/dummy-data/challengeStatus.json',
  consumptionHistory: './static/dummy-data/consumptionHistory.json',
  globalChallenge: `${apiBase}/community-global-challenge`,
  individualChallenge: `${apiBase}/individual-global-challenge`,
  ourConsumptionHistory: './static/dummy-data/ourConsumptionHistory.json',
};
