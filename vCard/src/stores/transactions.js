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
    myTransactions: null,
    allTransactions: null,
    lastPage: null
  }),
  actions: {
    getAll() {
      // lazy initialization
      if (!this.myTransactions) {
        this.fetch()
      }
      return this.myTransactions
    },
    async sendMoneyTo(amount, phone_number, confirmation_code, payment_type, description) {
      const token = getToken()

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

      this.myTransactions = response.data.data

      // convert all values to float. convert dates to Date objects
      this.myTransactions.forEach((transaction) => {
        transaction.value = parseFloat(transaction.value)
        transaction.date = new Date(transaction.datetime)
      })
    },
    async searchTransaction(phone) {
      this.allTransactions = this.allTransactions.filter((item) => item.phone_number == phone)

      while (this.allTransactions.length < 1) {
        ++currentPage
        await this.paginate(currentPage)
        this.allTransactions = this.allTransactions.filter((item) => item.phone_number == phone)
      }

      console.log(this.allTransactions, currentPage)
    },
    async AllTransactions() {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.lastPage = response.data.last
        this.allTransactions = response.data.data.data

        // convert all values to float. convert dates to Date objects
        this.allTransactions.forEach((transaction) => {
          transaction.value = parseFloat(transaction.value)
          transaction.date = new Date(transaction.datetime)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async paginate(page) {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.allTransactions = response.data.data.data

        // convert all values to float. convert dates to Date objects
        this.allTransactions.forEach((transaction) => {
          transaction.value = parseFloat(transaction.value)
          transaction.date = new Date(transaction.datetime)
        })
      } catch (e) {
        console.log(e)
      }
    },
  }
})
