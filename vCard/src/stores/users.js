import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'

export const useUsersStore = defineStore('users', {
    state: () => ({
        admins: null,
    }),
    actions: {
        async fetchAdmins() {
            try{
                const token = getToken()

                const adminsData = await axios.get(`${ConfigUtil.getApiUrl()}/admins`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                this.admins = adminsData.data.data;
                return 
            }catch(e){
                console.log(e);
            }
            
        },
        async addUser(name, email, password){
            console.log(name, email, password)

            try{
                const token = getToken()

                const response = await axios.post(`${ConfigUtil.getApiUrl()}/users`, 
                    {
                        name: name,
                        email: email,
                        password: password,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            }catch(e){
                console.log(e);
            }
        },
        async deleteAdmin(id) {
            try{
                const token = getToken()

                const response = await axios.delete(`${ConfigUtil.getApiUrl()}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(async (response) => {
                    console.log(response);
                    await this.fetchAdmins().then(() => {
                        return response.data.status
                    })
                });
            }catch(e){
                console.log(e);
            }
        },
    },
    mutations: {
        
    }
});