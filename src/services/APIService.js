import axios from 'axios';
import AuthState from '../states/AuthState';
import * as config from '../config';
import ProfileState from '../states/ProfileState';
import HitlistState from '../states/HitlistState';
import DevicelistState from '../states/DevicelistState';
import AdvicesState from '../states/AdvicesState';
import ChallengesState from '../states/ChallengesState';
import ConsumptionHistoryState from '../states/ConsumptionHistoryState';

const APIService = () => {
  const endpoints = (AuthState.get('demo')) ? config.demoEndpoints : config.prodEndpoints;

  const auth = postData => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      AuthState.set('token', data.data.token);
      AuthState.set('loggedIn', Boolean(data.data.token));
      resolve(data);
    };
    axios.get(endpoints.signin, postData)
      .then(success)
      .catch((error) => {
        if (error.response && error.response.status === 0) {
          success(error.response);
        } else {
          reject(error);
        }
      });
  });

  const register = postData => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      AuthState.set('token', data.data.token);
      AuthState.set('loggedIn', Boolean(data.data.token));
      resolve(data);
    };
    axios.get(endpoints.register, postData)
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
      Object.keys(data.data).forEach((key) => {
        ProfileState.set(key, data.data[key]);
      });
      resolve(data);
    };
    axios.get(endpoints.profile, {
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

  const hitlist = () => new Promise((resolve, reject) => {
    const success = ({ data }) => {
      HitlistState.set('data', data.data);
      resolve(data);
    };
    axios.get(endpoints.hitlist, {
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
    axios.get(endpoints.devicelist, {
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
    axios.get(endpoints.advices, {
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
    axios.get(endpoints.challenges, {
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
    axios.get(endpoints.challengeStatus, {
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
    axios.get(endpoints.consumptionHistory, {
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
  };
};

export default APIService();
