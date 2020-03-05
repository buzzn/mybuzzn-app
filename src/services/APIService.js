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
    axios.get(`${endpoints().devicelist}?begin=${(((new Date()).getTime() / 1000) - (24 * 60 * 60))}`, {
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
          GlobalChallengeState.set('prognose', Object.values(individual.data.saving)[0]);
          GlobalChallengeState.set('benchmark', Object.values(individual.data.baseline)[0]);
          resolve();
        }).catch((error) => {
          if (error.response && error.response.status === 0) {
            GlobalChallengeState.set('prognose', Object.values(error.response.data.saving)[0]);
            GlobalChallengeState.set('prognose', Object.values(error.response.data.baseline)[0]);
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

  const consumptionHistory = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      const temp = {};
      const dataKeys = Object.keys(data);
      const length = dataKeys.length;
      const step = 15;
      for (let s = 0; s <= length; s += step) {
        const times = dataKeys.slice(s, s + step).map((index) => {
          const a = index.split(/[^0-9]/);
          const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
          return { t: Math.round(d), v: data[index] * 1000 };
        });

        const time = times.reduce((a, b) => ({
          t: a.t + b.t,
          v: a.v + b.v,
        }));

        temp[Math.round(time.t / times.length / 1000)] = time.v / times.length;
      }
      // dataKeys.forEach((index) => {
      //   const a = index.split(/[^0-9]/);
      //   const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);

      //   temp[(d / 1000).toString()] = data[index] * 1000;
      // });
      ConsumptionHistoryState.set('data', { temp });
      resolve(data);
    };
    axios.get(`${endpoints().consumptionHistory}?begin=${(Date.now() / 1000) - (24 * 60 * 60)}`, {
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
      const transformData = (dataSet) => {
        const temp = {};
        const dataKeys = Object.keys(dataSet);
        const length = dataKeys.length;
        const step = 15;
        for (let s = 0; s <= length; s += step) {
          const times = dataKeys.slice(s, s + step).map((index) => {
            const a = index.split(/[^0-9]/);
            const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
            return { t: Math.round(d), v: dataSet[index] * 1000 };
          });

          const time = times.reduce((a, b) => ({
            t: a.t + b.t,
            v: a.v + b.v,
          }));

          temp[Math.round(time.t / times.length / 1000)] = time.v / times.length;
        }
        // dataKeys.forEach((index) => {
        //   const a = index.split(/[^0-9]/);
        //   const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
        //   temp[(d / 1000).toString()] = dataSet[index];
        // });
        return temp;
      };
      ConsumptionHistoryState.set('data', { consumed: transformData(data.consumed), produced: transformData(data.produced) });
      resolve(data);
    };
    axios.get(`${endpoints().ourConsumptionHistory}?begin=${(Date.now() / 1000) - (24 * 60 * 60)}`, {
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
  };
};

export default APIService();
