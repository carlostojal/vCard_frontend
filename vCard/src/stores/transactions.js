import { defineStore } from 'pinia'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken' 
import { useUserStore } from './user'
import { useNotificationsStore } from './notifications'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    userStore: useUserStore(),
    notificationsStore: useNotificationsStore(),
    transactions: null,
    allTransactions: null,
  }),
  actions: {
    getAll() {
      // lazy initialization
      if (!this.transactions) {
        this.fetch()
      }
      return this.transactions
    },
    async sendMoneyTo(amount, phone_number, confirmation_code, payment_type, description) {
      const token = getToken();

      // make the request to the backend
      const response = await axios.post(
        `${ConfigUtil.getApiUrl()}/vcards/send`,
        {
          amount: parseFloat(amount),
          phone_number: phone_number,
          confirmation_code: confirmation_code,
          description: description,
          payment_type: payment_type
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      try {
        this.userStore.fetch().catch((e) => {
          console.error('Error getting user data: ' + e)
        })

        try {
          this.notificationsStore.sendNotification(phone_number, notifMessage)
        } catch (error) {
          console.error(error)
        }

        this.notificationsStore.sendNotification(phone_number, notifMessage)
        // decrement the user balance
        this.userStore.decrementBalance(amount)
      } catch (e) {
        console.log(e)
      }

      return response.data.status
    },
    async fetch() {
      const token = getToken()

      const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('response ', response.data.data)
      this.transactions = response.data.data
      console.log('this.transactions ', this.transactions)

      // convert all values to float. convert dates to Date objects
      this.transactions.forEach((transaction) => {
        transaction.value = parseFloat(transaction.value)
        transaction.date = new Date(transaction.datetime)
      })
    },
    async searchTransaction(phone) {
      console.log('phone ', phone)
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions/search/${phone}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log('response ', response.data.data.data)
        this.allTransactions = response.data.data.data
        console.log('this.allTransactions ', this.transactions)

        // convert all values to float. convert dates to Date objects
        this.allTransactions.forEach((transaction) => {
          transaction.value = parseFloat(transaction.value)
          transaction.date = new Date(transaction.datetime)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async AllTransactions() {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log('response ', response.data.data.data)
        this.allTransactions = response.data.data.data
        console.log('this.allTransactions ', this.allTransactions)

        // convert all values to float. convert dates to Date objects
        this.allTransactions.forEach((transaction) => {
          transaction.value = parseFloat(transaction.value)
          transaction.date = new Date(transaction.datetime)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
})
