import { defineStore } from 'pinia';
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';

export const useTransactionsStore = defineStore('transactions', {
    state: () => ({
        transactions: null
    }),
    actions: {
        getAll() {
            if(!this.transactions) {
                this.fetch();
            }
            return this.transactions;
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

            this.transactions = transactions.data;

            // convert all values to float
            this.transactions.forEach(transaction => {
                transaction.value = parseFloat(transaction.value);
            });

            console.log(this.transactions)
        }
    }
});