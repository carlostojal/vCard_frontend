import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';
import router from '../router';

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '...',
        balance: 0,
        phone: 9999999999,
        email: 'email@mail.com',
        token: null
    }),
    actions: {
        init(name, balance, phone, email, token) {
            this.name = name;
            this.balance = balance;
            this.phone = phone;
            this.email = email;
            this.token = token;
        },
        getName() {
            return this.name;
        },
        setName(name) {
            this.name = name;
        },
        setBalance(balance) {
            this.balance = balance;
        },
        decrementBalance(amount) {
            this.balance -= amount;
        },
        incrementBalance(amount) {
            this.balance += amount;
        },
        getPhone() {
            return this.phone;
        },
        setPhone(phone) {
            this.phone = phone;
        },
        setEmail(email) {
            this.email = email;
        },
        setToken(token) {
            this.token = token;
            sessionStorage.setItem('token', token);
        },
        async fetch() {
            this.token = sessionStorage.getItem('token');
            const userData = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/profile`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            this.name = userData.data.data.name;
            this.balance = parseFloat(userData.data.data.balance);
            this.email = userData.data.data.email;
            this.phone = parseInt(userData.data.data.phone_number);
        },
        async logout() {
            try {
                await axios.get(`${ConfigUtil.getApiUrl()}/logout`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then(response => {
                    // alert(response.data.message);
                    alert('Logout Successful')
                    this.token = null;
                    sessionStorage.removeItem('token');
                    router.replace('/');
                });
            }catch(err){
                alert(err.response.data.message);
                return;
            }
        }
    },
    mutations: {
        
    }
});
