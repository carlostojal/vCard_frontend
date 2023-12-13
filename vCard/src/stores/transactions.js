import { defineStore } from 'pinia'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken' 
import { useUserStore } from './user'
import { useNotificationsStore } from './notifications'
import { useToast } from 'vue-toastification'
import router from '../router';
import { saveAs } from 'file-saver';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    userStore: useUserStore(),
    notificationsStore: useNotificationsStore(),
    myTransactions: null,
    allTransactions: null,
    lastPage: null,
    lastPage_myTrans: null,
    toast: useToast(),
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
      try {
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
      return response.data
    }catch(e) {
        this.toast.error("Transaction couldnt be processed, try again later");
        router.replace('/')
        return false
    }

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
          // this.lastPage_myTrans = response.data.last
          // this.myTransactions = response.data[0].data
          this.lastPage_myTrans = response.data.data.last
          this.myTransactions = response.data.data.transactions.data
          // convert all values to float. convert dates to Date objects
          this.myTransactions.forEach((transaction) => {
            transaction.value = parseFloat(transaction.value)
            transaction.date = new Date(transaction.datetime)
          })
        })
    },
    async fetchAllTransactionType(type) {
      console.log("T1")
      try {
        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/transactions/search?type=${type}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            // this.lastPage = response.data.last
            // this.allTransactions = response.data[0].data
            this.lastPage = response.data.data.last
            this.allTransactions = response.data.data.transactions.data

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
      console.log("T2")
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions/search?type=${type}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {

          // this.allTransactions = response.data[0].data
          // this.lastPage = response.data.last
          this.allTransactions = response.data.data.transactions.data

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
    async searchAllTransaction(query, type) {
      console.log("T3")
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
            // this.allTransactions = response.data.data.data
            // this.lastPage = response.data.last
            this.allTransactions = response.data.data.transactions.data
            this.lastPage = response.data.data.last

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
      console.log("T4")
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/transactions/search/${query}?type=${type}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.allTransactions = response.data.data.transactions.data
        this.lastPage = response.data.data.last

        // convert all values to float. convert dates to Date objects
        this.allTransactions.forEach((transaction) => {
          transaction.value = parseFloat(transaction.value)
          transaction.date = new Date(transaction.datetime)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async fetchMyTransactions(type) {
      try {
        const token = getToken()

        const response = await axios
          .get(`${ConfigUtil.getApiUrl()}/vcards/transactions?type=${type}`, {
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
      } catch (e) {
        console.log(e)
      }
    },
    async paginate_myTransactions(page) {
      try {
        const token = getToken()

        const response = await axios.get(`${ConfigUtil.getApiUrl()}/vcards/transactions?page=${page}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            this.lastPage = response.data.data.last
            this.myTransactions = response.data.data.transactions.data

            // convert all values to float. convert dates to Date objects
            this.myTransactions.forEach((transaction) => {
              transaction.value = parseFloat(transaction.value)
              transaction.date = new Date(transaction.datetime)
            })
          })
      } catch (e) {
        console.log(e)
      }
    },
    async extractPDF(month, year){
      try{

          const token = getToken()

          const response = await axios.get(`${ConfigUtil.getApiUrl()}/extract/pdf?year=2023&month=12`, 
          {
            headers: {
              //responseType: 'arraybuffer',
              Accept: 'application/pdf',
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
            console.log(response.data)
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(blob);
            window.open(response.data);
            //saveAs(blob, 'output.pdf');
            
          })

      }catch(e){
        console.log(e)
      }
    },
  }
})
