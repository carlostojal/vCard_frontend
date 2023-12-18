import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'
import { useToast } from 'vue-toastification'
 
export const useUsersStore = defineStore('users', {
    state: () => ({
        admins: null,
        lastPage: null,
        toast: useToast(),
    }),
    actions: {
        async fetchAdmins(page) {
            try{
                const token = getToken()

                const adminsData = await axios.get(`${ConfigUtil.getApiUrl()}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        page: page,
                  }
                });
                this.admins = adminsData.data.data.users.data;
                this.lastPage = adminsData.data.data.last;
                
            }catch(e){
                console.log(e);
            }
            
        },
        async addUser(name, email, password){

            try{
                const token = getToken()

                const response = await axios.post(`${ConfigUtil.getApiUrl()}/users`, {
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

                if(response.data.status == "success"){
                    this.toast.success(response.data.message);
                    await this.fetchAdmins();
                }

            }catch(e){
                this.toast.error(e.response.data.message);
            }
        },
        async deleteAdmin(id) {
            try{
                const token = getToken()

                const response = await axios.delete(`${ConfigUtil.getApiUrl()}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if(response.data.status == "success"){
                    this.toast.success(response.data.message);
                    await this.fetchAdmins();
                }
                
            }catch(e){
                this.toast.error(e.response.data.message);
            }
        },
    },
    mutations: {
        
    }
});
