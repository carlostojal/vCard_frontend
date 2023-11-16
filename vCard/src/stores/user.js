import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';

export const useUserStore = defineStore('user', {
    state: () => ({
        name: 'John Doe',
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
        addBalance(amount) {
            if(amount > 0)
                this.balance += amount;
        },
        removeBalance(amount) {
            if(amount > 0)
                this.balance -= amount;
        },
        updateName(name) {
            this.name = name;
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
            this.balance = userData.data.data.balance;
            this.email = userData.data.data.email;
            this.phone = userData.data.data.phone_number;
        }
    }
});
