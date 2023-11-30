import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'
import { defineAsyncComponent } from 'vue';

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
    async searchVcards(phone, currentPage, totalPages) {

      this.data_vcard = this.data_vcard.filter((item) => item.phone_number == phone)

      while( this.data_vcard.length < 1) {

        ++currentPage
        await this.paginate(currentPage)
        this.data_vcard = this.data_vcard.filter((item) => item.phone_number == phone)

      }

      console.log(this.data_vcard, currentPage)

    },
    async paginate(page){
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