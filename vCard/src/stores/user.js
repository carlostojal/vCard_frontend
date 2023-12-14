import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';
import router from '../router';
import { useNotificationsStore } from './notifications'
import { getToken } from '@/utils/GetSessionToken'
import { useToast } from 'vue-toastification'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '...',
        balance: 0,
        phone: 9999999999,
        email: 'email@mail.com',
        avatar: null,
        token: null,
        isAdmin: false,
        notifications: useNotificationsStore(),
        transactions: null,
        toast: useToast(),
        fetchDone: false
    }),
    actions: {
        init(name, balance, phone, email, token) {
            this.name = name
            this.balance = balance
            this.phone = phone
            this.email = email
            this.token = token
        },
        getName() {
            return this.name
        },
        setName(name) {
            this.name = name
        },
        setBalance(balance) {
            this.balance = balance
        },
        decrementBalance(amount) {
            this.balance -= amount
        },
        incrementBalance(amount) {
            this.balance += amount
        },
        getPhone() {
            return this.phone
        },
        setPhone(phone) {
            this.phone = phone
        },
        setEmail(email) {
            this.email = email
        },
        setToken(token) {
            this.token = token
            sessionStorage.setItem('token', token)
        },
        async fetch() {
            try {
                this.token = getToken()
                const userData = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/profile`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                try {
                    const avatar = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/photo`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    if (avatar.data.data.photo != null) {
                        this.avatar = ConfigUtil.getDomainUrl() + avatar.data.data.photo
                    } else {
                        this.avatar = null
                    }
                } catch (err) {
                    this.avatar = null;
                }
                this.name = userData.data.data.name
                this.balance = parseFloat(userData.data.data.balance)
                this.email = userData.data.data.email
                this.phone = parseInt(userData.data.data.phone_number)
                this.isAdmin = false;

                this.fetchDone = true;

                if(!this.notifications.initDone)
                    this.notifications.init();
                
            } catch (err) {
            }
        },
        async fetchAdmin() {
            try {
                this.token = getToken()
                const userData = await axios.get(`${ConfigUtil.getApiUrl()}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                this.name = userData.data.data.name
                this.email = userData.data.data.name
                this.isAdmin = true;
            } catch (err) {
                this.token = null;
                router.push('/admin');
                this.toast.error('Please try again later, server error');
            }

        },
        async logout() {
            try {
                await axios.get(`${ConfigUtil.getApiUrl()}/logout`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then(() => {
                    this.toast.info('Logout Successful')
                    this.token = null
                    sessionStorage.removeItem('token')
                    if (this.isAdmin) {
                        router.replace('/admin')
                    } else {
                        router.replace('/')
                    }
                })
                this.notifications.destroy()
            } catch (err) {
                this.toast.error(err.response.data.message)
                return
            }
        },
        async getAuthGuard() {
            let retval = null
            try {
                this.token = getToken()
                await axios.get(`${ConfigUtil.getApiUrl()}/checkAuth`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then((response) => {
                    if (response.data.status == 'success') {
                        retval = response.data.message
                    }
                }).catch((error) => {
                    return null
                })
            } catch (err) {
                return null
            }
            return retval
        },
        async createVCard(name, email, phone, password, confirmation_code, photo) {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('phone_number', phone);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('confirmation_code', confirmation_code);
                if (photo != null) {
                    formData.append('photo', photo);
                }
                const response = await axios.post(`${ConfigUtil.getApiUrl()}/vcards`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data.status
            } catch (err) {
                let msg = "Account Creation Error:\n"
                const errors = err.response.data.errors
                console.log(errors)
                Object.keys(errors).forEach((fieldName) => {
                    errors[fieldName].forEach((error) => {
                        msg += String(error) + '\n';
                    });
                });
                this.toast.error(msg);
                return
            }
        },
        async verifyPassword(password){
            try{
                this.token = getToken()

                const response = await axios.post(`${ConfigUtil.getApiUrl()}/vcards/verifyPassword`, {
                    password: password
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then((response) => {
                    return response.data.status
                })
            }catch(e){
                this.toast.error(e.response.data.message)
            }
        },
    },
    mutations: {}
})
