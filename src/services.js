import sailsIO from 'sails.io.js';
import socketIO from 'socket.io-client';
import axios from 'axios';
import * as configurator from 'configurator/configurator';

let io;

export const connectSockets = () => {
  const apiBaseUrl = configurator.config.api.reckoning;
  return new Promise((resolve) => {
    axios.get(`${apiBaseUrl}/v1/issouser`, { withCredentials: true }).then(response => {
      const user = response.data;
      io = sailsIO(socketIO);
      io.sails.url = apiBaseUrl;

      io.socket.on('connect', (msg) => {
        resolve({user, io});
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

export const changeActiveStory = async (roomId, story) => {
  const { name, description, id } = story;
  const apiBaseUrl = configurator.config.api.reckoning;
  const baseActiveStoriesUrl = `${apiBaseUrl}/v1/activestories`;
  const getActiveStoryUrl = `${baseActiveStoriesUrl}?where={"room":"${roomId}","rallyStory":"${id}"}`;
  const request = makeRequester();
  
  let data = await request.get(getActiveStoryUrl);
  if (data.length < 1) {
    const newStory = {
      name,
      description,
      rallyStory: id,
      room: roomId,
    };
    data = await request.post(baseActiveStoriesUrl, newStory);
  }

  await request.put(`/v1/rooms/${roomId}`, { activeStory: data[0].id });
  return data[0] || data;
}

export const updateParticipant = async (roomId, participant) => {
  const { id } = participant;
  const apiBaseUrl = configurator.config.api.reckoning;
  const baseParticipationsUrl = `${apiBaseUrl}/v1/participations`;
  const request = makeRequester();

  await request.put(`${baseParticipationsUrl}/${id}`, participant);
  return await request.get(`${apiBaseUrl}/v1/rooms/${roomId}`);
};

export const addVote = async (value, activeStory) => {
  const { id } = activeStory;
  const apiBaseUrl = configurator.config.api.reckoning;
  const request = makeRequester();
  const vote = {
    value,
    activeStory: id,
  };
  return await request.post(`${apiBaseUrl}/v1/votes`, vote);

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