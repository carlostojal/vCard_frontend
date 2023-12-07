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
    lastPage: null,
    lastPage_myTrans: null,
  }),
  actions: {
    async getAll() {
      // lazy initialization
      if (!this.myTransactions) {
        await this.fetch()
      }
      return this.myTransactions
    },
    async sendMoneyTo(amount, phone_number, confirmation_code, payment_type, description) {
      const token = getToken()

      // make the request to the backend
      const response = await axios.post(`${ConfigUtil.getApiUrl()}/vcards/send`,
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

      const response = await axios
        .get(`${ConfigUtil.getApiUrl()}/vcards/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          this.lastPage_myTrans = response.data.last
          this.myTransactions = response.data[0].data
          // convert all values to float. convert dates to Date objects
          this.myTransactions.forEach((transaction) => {
            transaction.value = parseFloat(transaction.value)
            transaction.date = new Date(transaction.datetime)
          })
        })
    },
    async fetchTransactionType(type) {
      try {
        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/transactions/search?type=${type}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.lastPage = response.data.last
            this.allTransactions = response.data[0].data

            // convert all values to float. convert dates to Date objects
            this.allTransactions.forEach((transaction) => {
              transaction.value = parseFloat(transaction.value)
              transaction.date = new Date(transaction.datetime)
            })
          })
      } catch (e) {
        console.log(e)
      }
    },
    async paginate_allTransactionsType(page, type){
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions/search?type=${type}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {

          this.allTransactions = response.data[0].data
          this.lastPage = response.data.last

          // convert all values to float. convert dates to Date objects
          this.allTransactions.forEach((transaction) => {
            transaction.value = parseFloat(transaction.value)
            transaction.date = new Date(transaction.datetime)
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    async searchTransaction(query, type) {
      try {
        if(type == 'debit'){
          type = 'D'
        }else if(type == 'credit'){
          type = 'C'
        }

        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/transactions/search/${query}?type=${type}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.allTransactions = response.data.data.data
            this.lastPage = response.data.last

            // convert all values to float. convert dates to Date objects
            this.allTransactions.forEach((transaction) => {
              transaction.value = parseFloat(transaction.value)
              transaction.date = new Date(transaction.datetime)
            })
          })
      } catch (e) {
        console.log(e)
      }
    },
    async paginate_allTransactionsSearch(page, type, query){
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions/search/${query}?type=${type}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.allTransactions = response.data.data.data
        this.lastPage = response.data.last

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

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/transactions`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.lastPage = response.data.last
            this.allTransactions = response.data.data.data
            console.log('todas', this.lastPage)

            // convert all values to float. convert dates to Date objects
            this.allTransactions.forEach((transaction) => {
              transaction.value = parseFloat(transaction.value)
              transaction.date = new Date(transaction.datetime)
            })
          })
      } catch (e) {
        console.log(e)
      }
    },
    async paginate_myTransactions(page) {
      try {
        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/vcards/transactions?page=${page}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.lastPage = response.data.last
            this.myTransactions = response.data[0].data

            // convert all values to float. convert dates to Date objects
            this.myTransactions.forEach((transaction) => {
              transaction.value = parseFloat(transaction.value)
              transaction.date = new Date(transaction.datetime)
            })
          })
      } catch (e) {
        console.log(e)
      }
    }
  }
})
