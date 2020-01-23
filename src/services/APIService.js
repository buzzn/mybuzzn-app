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
      DevicelistState.set('data', data.data);
      resolve(data);
    };
    axios.get(endpoints().devicelist, {
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
    const success = ({ data }) => {
      GlobalChallengeState.set('totalPrognose', data.totalPrognose);
      GlobalChallengeState.set('benchmark', data.benchmark);
      GlobalChallengeState.set('prognose', data.prognose);
      resolve(data);
    };
    axios.get(endpoints().globalChallenge, {
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

  const currentChallenge = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      ChallengesState.set('active', data.data);
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
      ConsumptionHistoryState.set('data', data.data);
      resolve(data);
    };
    axios.get(endpoints().consumptionHistory, {
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
    globalChallenge,
    postProfile,
  };
};

export default APIService();
