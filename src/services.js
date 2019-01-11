import sailsIO from 'sails.io.js';
import socketIO from 'socket.io-client';
import axios from 'axios';
import * as configurator from 'configurator/configurator';

let io;

export const connectSockets = () => {
  const apiBaseUrl = configurator.config.api.reckoning;
  return new Promise((resolve) => {
    axios.get(`${apiBaseUrl}/v1/issouser`, { withCredentials: true }).then(user => {
      io = sailsIO(socketIO);
      io.sails.url = apiBaseUrl;

      io.socket.on('connect', (msg) => {
        resolve(io);
      });

      

      io.socket.on('activestory', function (msg) {
        console.log('activeStory: ', msg);
      });
    });
  });
};

export const getStories = async () => {
  const apiBaseUrl = configurator.config.api.reckoning;
  const request = makeRequester();
  
  return await request.get(`${apiBaseUrl}/v1/rallystories?flowState=${configurator.config.storyFilter.flowState}&project=${configurator.config.storyFilter.project}`);  
};

export const getRoom = async (roomId) => {
  const apiBaseUrl = configurator.config.api.reckoning;
  const request = makeRequester();
  
  return await request.get(`${apiBaseUrl}/v1/rooms/${roomId}`);
}

export const getActiveStory = async (storyId) => {
  const apiBaseUrl = configurator.config.api.reckoning;
  const request = makeRequester();
  
  return await request.get(`${apiBaseUrl}/v1/activestories/${storyId}`);
}

const makeRequester = () => {
  return {
    get: async (url) => {
      return new Promise((resolve, reject) => {
        io.socket.get(url, (data, JWR) => {
          if (JWR.statusCode > 299) {
            reject({ body: data, JWR });
          }
          resolve(data);
        });
      });

    },
    put: async (url, body) => {
      return new Promise((resolve, reject) => {
        io.socket.put(url, body, (data, JWR) => {
          if (JWR.statusCode > 299) {
            reject({ body: data, JWR });
          }
          resolve(data);
        });
      });
    },
    post: async (url, body) => {
      return new Promise((resolve, reject) => {
        io.socket.post(url, body, (data, JWR) => {
          if (JWR.statusCode > 299) {
            reject({ body: data, JWR });
          }
          resolve(data);
        });
      });
    },
  }

}