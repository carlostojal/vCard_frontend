import { defineStore } from 'pinia'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil'
import FormatUtil from '../utils/FormatUtil'

import { useUserStore } from './user'
import { useNotificationsStore } from './notifications'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    userStore: useUserStore(),
    notificationsStore: useNotificationsStore(),
    transactions: null
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
      const token = sessionStorage.getItem('token')
      if (!token) {
        throw new Error('No token found!')
      }

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
    async fetch(phone) {
      const token = sessionStorage.getItem('token')
      if (!token) {
        throw new Error('No token found!')
      }

      const transactions = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.transactions = transactions.data.data

      // convert all values to float. convert dates to Date objects
      this.transactions.forEach((transaction) => {
        transaction.value = parseFloat(transaction.value)
        transaction.date = new Date(transaction.datetime)
      })
    }
  }
})
