import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
      logged: false,
      name: '',
      token: '',
    } 
  },
  actions: {
    setUserData(payload) {
      this.logged = true;
      this.name = payload.data.data.name;
      this.token = payload.data.data.tokenId;
    },
    clearData() {
      this.logged = false;
      this.name = '',
      this.token = ''
    }
  },
  getters: {
    isLogged() {
      return this.logged;
    },
    getName() {
      return this.name;
    },
    getToken() {
      return this.token;
    }
  }
})