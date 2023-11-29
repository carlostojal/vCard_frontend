import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'

export const useVcardsStore = defineStore('vcards', {
    state: () => ({
        data_vcard: null,
    }),
    actions: {
        async fetchVcards(phone) {
            try {
                const token = sessionStorage.getItem('token')
                if (!token) {
                    throw new Error('No token found!')
                }

                const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/search`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        phone_number: phone
                    }
                })

                this.data_vcard = response.data.data.data
                
            } catch (e) {
              console.log(e)
            }
        },
    },
    mutations: {
        
    }
});