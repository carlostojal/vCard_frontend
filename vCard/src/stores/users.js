import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'

export const useUsersStore = defineStore('users', {
    state: () => ({
        admins: null,
    }),
    actions: {
        async fetchAdmins() {
            try{
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found!')
                }

                const adminsData = await axios.get(`${ConfigUtil.getApiUrl()}/admins`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                this.admins = adminsData.data.data;
            }catch(e){
                console.log(e);
            }
            
        },
    },
    mutations: {
        
    }
});