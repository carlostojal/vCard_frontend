import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'

export const useVcardsStore = defineStore('vcards', {
  state: () => ({
    data_vcard: null,
    lastPage: null,
  }),
  actions: {
    async fetchVcards() {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            this.lastPage = response.data.last
            this.data_vcard = response.data[0].data
          })
      } catch (e) {
        console.log(e)
      }
    },
    async searchVcards(query) {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/search/${query}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
      console.log(response)
          this.data_vcard = response.data.data.data
          this.lastPage = response.data.last

        })
      } catch (e) {
        console.log(e)
      }
    },
    async paginate(page) {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          this.data_vcard = response.data[0].data
        
      } catch (e) {
        console.log(e)
      }
    }
  },
  mutations: {}
})