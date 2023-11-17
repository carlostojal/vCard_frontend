import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';

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
        setName(name) {
            this.name = name;
        },
        setBalance(balance) {
            this.balance = balance;
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
        }
    },
    mutations: {
        
    }
});
