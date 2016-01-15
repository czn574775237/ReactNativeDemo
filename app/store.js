import React from 'react-native';

let {
  AsyncStorage
} = React;

const TOKEN_KEY = '@App:token';

const store = {
  async setToken(token) {
    store.setItem(TOKEN_KEY, token);
  },
  async getToken() {
    return await store.getItem(TOKEN_KEY);
  },


  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  },

  async getItem(key) {
    let value;
    try {
      value = await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      console.log(e);
    }
    return value;
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  }
};

export default store;
