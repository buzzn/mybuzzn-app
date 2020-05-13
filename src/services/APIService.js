/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import axios from 'axios';
import AuthState from '../states/AuthState';
import * as config from '../config';
import ProfileState from '../states/ProfileState';
import HitlistState from '../states/HitlistState';
import DevicelistState from '../states/DevicelistState';
import AdvicesState from '../states/AdvicesState';
import ChallengesState from '../states/ChallengesState';
import ConsumptionHistoryState from '../states/ConsumptionHistoryState';
import GlobalChallengeState from '../states/GlobalChallengeState';
import PerPersonConsumptionState from '../states/PerPersonConsumptionState';

const APIService = () => {
  const endpoints = () => {
    if (AuthState.get('demo')) {
      return config.demoEndpoints;
    }
    return config.prodEndpoints;
  };

  const auth = postData => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      AuthState.set('user', postData.user);
      AuthState.set('password', postData.password);
      AuthState.set('token', data.sessionToken);
      AuthState.set('loggedIn', Boolean(data.sessionToken));
      AuthState.set('loggedInAt', Date.now());
      AuthState.set('expired', +(new Date(data.expiredTimestamp * 1000)));
      // set Bearer Token
      axios.defaults.headers.common.Authorization = `Bearer ${data.sessionToken}`;
      resolve(data);
    };
    const catchCase = (error) => {
      if (error.response && error.response.status === 0) {
        success(error.response);
      } else {
        reject(error);
      }
    };

    axios.post(endpoints().signin, postData)
      .then(success)
      .catch(catchCase);
  });

  const register = postData => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      AuthState.set('token', data.sessionToken);
      AuthState.set('loggedIn', Boolean(data.sessionToken));
      resolve(data);
    };
    axios.get(endpoints().register, postData)
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const profile = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      Object.keys(data).forEach((key) => {
        switch (key) {
          case 'id':
            ProfileState.set('id', data[key]);
            break;
          case 'mail':
            ProfileState.set('email', data[key]);
            break;
          case 'name':
            ProfileState.set('lastname', data[key]);
            break;
          case 'first_name':
          case 'firstName':
            ProfileState.set('firstname', data[key]);
            break;
          case 'nick':
            ProfileState.set('username', data[key]);
            break;
          case 'avatar':
            ProfileState.set('avatar', data[key]);
            break;
          case 'flat_size':
          case 'flatSize':
            ProfileState.set('flatSize', data[key]);
            break;
          case 'inhabitants':
            ProfileState.set('flatPopulation', data[key]);
            break;
          case 'meterId':
            ProfileState.set('meterId', data[key]);
            break;
          default:
            break;
        }
      });
      resolve(data);
    };
    axios.get(endpoints().profile)
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const postProfile = postData => new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = `Bearer ${AuthState.get('token')}`;
    const success = ({ data }) => {
      resolve(data);
    };
    axios.put(endpoints().profile, postData)
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const updatePassword = postData => new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = `Bearer ${AuthState.get('token')}`;
    const success = ({ data }) => {
      resolve(data);
    };
    axios.put(endpoints().updatePassword, postData)
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const hitlist = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      HitlistState.set('data', data.data);
      resolve(data);
    };
    axios.get(endpoints().hitlist, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const devicelist = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      const reducedObject = {};
      Object.values(data).forEach((dat) => {
        Object.entries(dat).forEach(([key, value]) => {
          if (!reducedObject[key]) reducedObject[key] = 0;
          reducedObject[key] += value;
        });
      });
      DevicelistState.set('data', reducedObject);
      resolve(reducedObject);
    };
    axios.get(`${endpoints().devicelist}`, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const perPersonConsumption = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      PerPersonConsumptionState.set('data', data);
      resolve(data);
    };
    axios.get(`${endpoints().perPersonConsumption}`, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const advices = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      AdvicesState.set('data', data.data);
      resolve(data);
    };
    axios.get(endpoints().advices, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const challenges = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      ChallengesState.set('available', data.data);
      resolve(data);
    };
    axios.get(endpoints().challenges, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const globalChallenge = () => new Promise((resolve, reject) => {
    axios.get(endpoints().globalChallenge, {
      token: AuthState.get('token'),
    })
      .then((community) => {
        GlobalChallengeState.set('totalPrognose', Object.values(community.data)[0]);

        axios.get(endpoints().individualChallenge, {
          token: AuthState.get('token'),
        }).then((individual) => {
          if (individual.status === 200) {
            GlobalChallengeState.set('prognose', Object.values(individual.data.saving)[0]);
            GlobalChallengeState.set('benchmark', individual.data.baseline);
          } else if (individual.data.name && individual.data.name === 'No baseline') {
            GlobalChallengeState.set('pending', false);
          } else {
            GlobalChallengeState.set('pending', true);
          }

          resolve();
        }).catch((error) => {
          if (error.response && error.response.status === 0) {
            if (error.response.data && error.response.data.saving) {
              GlobalChallengeState.set('prognose', Object.values(error.response.data.saving)[0]);
              GlobalChallengeState.set('benchmark', error.response.data.baseline);
            } else if (error.response.data.name && error.response.data.name === 'No baseline') {
              GlobalChallengeState.set('pending', false);
            } else {
              GlobalChallengeState.set('pending', true);
            }
            resolve();
          } else {
            reject(error);
          }
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          GlobalChallengeState.set('totalPrognose', Object.values(error.response.data)[0]);
        } else {
          reject(error);
        }
      });
  });

  const currentChallenge = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      ChallengesState.set('active', null);
      resolve(data);
    };
    axios.get(endpoints().challengeStatus, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const prepareHistoryData = (rawData) => {
    const times = Object.keys(rawData).map((dateTime) => {
      const a = dateTime.split(/[^0-9]/);
      const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
      return { dateTime, timestamp: d / 1000 };
    });

    const data = {};
    let i = 0;
    for (const dateTime in rawData) {
      data[times[i].timestamp] = rawData[dateTime];
      i += 1;
    }

    return data;
  };

  // const prepareHistoryData = (rawData, startTime) => {
  //   const steps = 0.25; // of an hour - 0.25 = every 15min
  //   const data = {};
  //   const stepInSec = 60 * 60 * steps;

  //   const times = Object.keys(rawData).map((index) => {
  //     const a = index.split(/[^0-9]/);
  //     const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  //     return { index, timestamp: d / 1000 };
  //   });

  //   let timeIndex = startTime;
  //   for (let i = 0; i < 24 / steps; i += 1) {
  //     // eslint-disable-next-line no-loop-func
  //     const timeSpace = times.filter(ts => timeIndex < ts.timestamp && (timeIndex + stepInSec) > ts.timestamp);

  //     if (timeSpace.length) {
  //       let value = 0;
  //       timeSpace.forEach(({ index }) => {
  //         value += rawData[index];
  //       });
  //       data[Math.round(timeIndex)] = value / timeSpace.length;
  //     }
  //     timeIndex += stepInSec;
  //   }
  //   return data;
  // };

  const consumptionHistory = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      const startTime = (Date.now() / 1000) - (24 * 60 * 60);
      ConsumptionHistoryState.set('data', { temp: prepareHistoryData(data.power, startTime) });
      // energy
      const energyValues = Object.keys(data.energy).map(key => data.energy[key]);
      ConsumptionHistoryState.set('consumption', Math.abs(energyValues[0] - energyValues[energyValues.length - 1]));
      resolve(data);
    };
    axios.get(`${endpoints().consumptionHistory}`, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const ourConsumptionHistory = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      // consumed
      const consumedPower = prepareHistoryData(data.consumed_power);
      const groupUsers = Object.keys(data.group_users).map(user => data.group_users[user]).map(d => prepareHistoryData(d.power));
      const consumed = {};
      Object.keys(consumedPower).forEach((timestamp) => {
        let sum = 0;
        groupUsers.forEach((user) => {
          sum += user[timestamp];
        });
        consumed[timestamp] = consumedPower[timestamp] + sum;
      });

      // produced
      const firstProducedPower = prepareHistoryData(data.produced_first_meter_power);
      const secondProducedPower = prepareHistoryData(data.produced_second_meter_power);
      const produced = {};
      Object.keys(firstProducedPower).forEach((timestamp) => {
        produced[timestamp] = firstProducedPower[timestamp] + secondProducedPower[timestamp];
      });
      ConsumptionHistoryState.set('data', { consumed, produced });

      // other data
      const consumedEnergyValues = Object.keys(data.consumed_energy).map(key => data.consumed_energy[key]);
      const groupUsersEnergy = Object.keys(data.group_users).map(user => data.group_users[user]).map(d => d.energy).reduce((collection, energy) => {
        const value = Object.keys(energy).map(d => energy[d]);
        return collection + (value[1] - value[0]);
      }, 0);

      const firstProductionEnergy = Object.keys(data.produced_first_meter_energy).map(key => data.produced_first_meter_energy[key]);
      const secondProductionEnergy = Object.keys(data.produced_second_meter_energy).map(key => data.produced_second_meter_energy[key]);
      ConsumptionHistoryState.set('consumption', groupUsersEnergy + (consumedEnergyValues[1] - consumedEnergyValues[0]));
      ConsumptionHistoryState.set('production',
        (firstProductionEnergy[1] - firstProductionEnergy[0]) +
        (secondProductionEnergy[1] - secondProductionEnergy[0]));
      resolve(data);
    };

    axios.get(`${endpoints().ourConsumptionHistory}`, {
      token: AuthState.get('token'),
    })
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  return {
    auth,
    register,
    profile,
    hitlist,
    devicelist,
    advices,
    challenges,
    currentChallenge,
    consumptionHistory,
    ourConsumptionHistory,
    globalChallenge,
    postProfile,
    updatePassword,
    perPersonConsumption,
  };
};

export default APIService();
