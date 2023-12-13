import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'
import { useToast } from 'vue-toastification'

export const useVcardsStore = defineStore('vcards', {
  state: () => ({
    data_vcard: null,
    lastPage: null,
    toast: useToast(),
  }),
  actions: {
    async fetchVcardsBlock(blocked) {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/search?blocked=${blocked}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
          .then((response) => {
            this.lastPage = response.data.data.last
            // this.data_vcard = response.data[0].data
            this.data_vcard = response.data.data.vcards.data
          })
      } catch (e) {
        console.log(e)
      }
    },
    async paginateType(page, blocked) {
      try {
        const token = getToken()
        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/search?blocked=${blocked}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
          .then((response) => {
            // this.data_vcard = response.data[0].data
            // this.lastPage = response.data.last
            this.data_vcard = response.data.data.vcards.data
            this.lastPage = response.data.data.last
          })
      } catch (e) {
        console.log(e)
      }
    },
    async searchVcards(query, blocked) {
      try {
        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/vcards/search/${query}/?blocked=${blocked}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.data_vcard = response.data.data.vcards.data
            this.lastPage = response.data.data.last
            // this.data_vcard = response.data.data.data
            // this.lastPage = response.data.last
          })
      } catch (e) {
        console.log(e)
      }
    },
    async paginateSearch(page, blocked, query) { //This function is not even being used??
      console.log("paginateSearch")
      try {
        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/vcards/search/${query}/?blocked=${blocked}&page=${page}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.data_vcard = response.data.data.data
            this.lastPage = response.data.last
          })
      } catch (e) {
        console.log(e)
      }
    },
    async changeBlock(phone, block) {
      try {

        const token = getToken()

        const response = await axios.patch(`${ConfigUtil.getApiUrl()}/vcards/block/${phone}`,
            {
              block: block,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }).then( (response) => {
              if(response.data.status == "success"){
                this.toast.success(response.data.message);
              }

            })
      } catch (e) {
        this.toast.error(e.response.data.message);
      }
    },
    async deleteVcard(phone) {
      try {

        const token = getToken()

        const response = await axios.delete(`${ConfigUtil.getApiUrl()}/vcards/${phone}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
          .then(async (response) => {
            if(response.data.status == "success"){
              this.toast.success(response.data.message);
              await this.fetchVcardsBlock('all')
            }
          })
      } catch (e) {
        this.toast.error(e.response.data.message);
      }
    },
    async editMaxDebit(phone, max_debit) {
      try {
        const token = getToken()

        const response = await axios.patch(`${ConfigUtil.getApiUrl()}/vcards/maxDebit/${phone}`,
          {
            max_debit: max_debit
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }).then(async (response) => {
            if(response.data.status == "success"){
              this.toast.success(response.data.message);
              await this.fetchVcardsBlock('all')
            }
          })
      }catch(e){
        this.toast.error(e.response.data.message);
      }
    },
  },
  mutations: {}
})
