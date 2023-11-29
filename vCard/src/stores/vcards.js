import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'

export const useVcardsStore = defineStore('vcards', {
    state: () => ({
        vcards: null,
    }),
    actions: {
        async fetchVcards() {
            try{
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found!')
                }

                const vcardsData = await axios.get(`${ConfigUtil.getApiUrl()}/vcards`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                this.vcards = vcardsData.data.data;
            }catch(e){
                console.log(e);
            }
            
        },
    },
    mutations: {
        
    }
});