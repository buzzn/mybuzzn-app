import axios from 'axios';
import AuthState from '../states/AuthState';
import * as config from '../config';
import ProfileState from '../states/ProfileState';
import HitlistState from '../states/HitlistState';

const APIService = () => {
  const auth = () => new Promise((resolve, reject) => {
    axios.get(config.endpoints.signin)
      .then(({ data }) => {
        AuthState.set('token', data.data.token);
        AuthState.set('loggedIn', Boolean(data.data.token));
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const profile = () => new Promise((resolve, reject) => {
    axios.get(config.endpoints.profile, {
      token: AuthState.get('token'),
    })
      .then(({ data }) => {
        Object.keys(data.data).forEach((key) => {
          ProfileState.set(key, data.data[key]);
        });
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const hitlist = () => new Promise((resolve, reject) => {
    axios.get(config.endpoints.hitlist, {
      token: AuthState.get('token'),
    })
      .then(({ data }) => {
        HitlistState.set('data', data.data);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return {
    auth,
    profile,
    hitlist,
  };
};

export default APIService();