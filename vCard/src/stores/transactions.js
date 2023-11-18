import { defineStore } from 'pinia';
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';

import { useUserStore } from './user';

export const useTransactionsStore = defineStore('transactions', {
    state: () => ({
        userStore: useUserStore(),
        transactions: null,
        ws: new WebSocket(ConfigUtil.getNotificationUrl())
    }),
    actions: {
        getAll() {
            // lazy initialization
            if(!this.transactions) {
                this.fetch();
            }
            return this.transactions;
        },
        async sendMoneyTo(amount, phone_number, confirmation_code, payment_type) {
            const token = sessionStorage.getItem('token');
            if(!token) {
                throw new Error('No token found!');
            }

            // make the request to the backend
            const response = await axios.post(`${ConfigUtil.getApiUrl()}/vcards/send`, {
                amount,
                phone_number,
                confirmation_code,
                payment_type
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(this.ws == null) {
                // initialize the websocket
                this.ws = new WebSocket(ConfigUtil.getNotificationUrl());
            }

            // send a notification
            this.ws.send(JSON.stringify({
                _destination: phone_number,
                _type: "credit_in",
                _message: `${this.userStore.getName()} sent you ${amount}`
            }));

            // decrement the user balance
            userStore.decrementBalance(amount);

        },
        async fetch() {
            const token = sessionStorage.getItem('token');
            if(!token) {
                throw new Error('No token found!');
            }

            const transactions = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/transactions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            this.transactions = transactions.data.data;

            // convert all values to float. convert dates to Date objects
            this.transactions.forEach(transaction => {
                transaction.value = parseFloat(transaction.value);
                transaction.date = new Date(transaction.datetime);
            });
        }
    }
});