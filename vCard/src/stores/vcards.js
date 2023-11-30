import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'

export const useVcardsStore = defineStore('vcards', {
  state: () => ({
    data_vcard: []
  }),
  actions: {
    async fetchVcards() {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.data_vcard = response.data.data
      } catch (e) {
        console.log(e)
      }
    },
    async searchVcards(phone) {
        console.log("phone ",phone)
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/search/${phone}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.data_vcard = response.data.data.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  mutations: {}
})