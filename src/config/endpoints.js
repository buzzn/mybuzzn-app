const apiBase = 'http://mybuzzn-backend.buzzn.net';

export const demoEndpoints = {
  register: './static/dummy-data/register.json',
  demo: './static/dummy-data/signin.json',
  signin: './static/dummy-data/signin.json',
  updatePassword: `${apiBase}/update-password`,
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

export const prodEndpoints = {
  demo: './static/dummy-data/signin.json',
  register: `${apiBase}/set-password`,
  updatePassword: `${apiBase}/password/request-reset-token`,
  signin: `${apiBase}/login`,
  profile: `${apiBase}/profile`,
  devicelist: `${apiBase}/individual-disaggregation`,
  hitlist: './static/dummy-data/hitlist.json',
  advices: './static/dummy-data/advices.json',
  challenges: './static/dummy-data/challenges.json',
  challengeStatus: './static/dummy-data/challengeStatus.json',
  globalChallenge: `${apiBase}/community-global-challenge`,
  individualChallenge: `${apiBase}/individual-global-challenge`,
  consumptionHistory: `${apiBase}/individual-consumption-history`,
  ourConsumptionHistory: `${apiBase}/group-consumption-history`,
};
