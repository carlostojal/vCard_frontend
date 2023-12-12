import { defineStore } from 'pinia'
import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'
import { useToast } from 'vue-toastification'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    allCategories: null,
    lastPage: null,
    toast: useToast(),
  }),
  actions: {
    async fetch() {
        try{
            const token = getToken()

            const response = await axios.get(`${ConfigUtil.getApiUrl()}/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                .then((response) => {
                    console.log(response)
                    this.lastPage = response.data.lastPage
                    this.allCategories = response.data.data.data
                    console.log(this.allCategories, this.lastPage)
                })
        }catch(e){
            console.log(e)
        }
    },
    async paginate(page) {
        try {
          const token = getToken()
  
          const response = await axios.get(`${ConfigUtil.getApiUrl()}/categories?page=${page}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
  
          this.allCategories = response.data.data.data
          
        } catch (e) {
          console.log(e)
        }
    },
    async fetchCategoriesType(type){
        try {
            const token = getToken()
            
            const response = await axios.get(`${ConfigUtil.getApiUrl()}/categories/search?type=${type}`,{
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              )
              .then((response) => {
                this.lastPage = response.data.lastPage
                this.allCategories = response.data.data.data
              })
          } catch (e) {
            console.log(e)
          }
    },
    async paginateType(page, type){
      try {
        const token = getToken()
        
        const response = await axios.get(`${ConfigUtil.getApiUrl()}/categories/search?type=${type}&page=${page}`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then((response) => {
            this.lastPage = response.data.lastPage
            this.allCategories = response.data.data.data
          })
      } catch (e) {
        console.log(e)
      }
    },
    async searchCategories(query, type){
      try {
        const token = getToken()
        console.log(query, type)
        const response = await axios.get(`${ConfigUtil.getApiUrl()}/categories/search/${query}?type=${type}`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then((response) => {
            this.lastPage = response.data.lastPage
            this.allCategories = response.data.data.data
          })
      }catch(e){
        console.log(e)
      }
    },
    async paginateSearch(page, type, query){
      try {
        const token = getToken()
        console.log(query, type)
        const response = await axios.get(`${ConfigUtil.getApiUrl()}/categories/search/${query}?type=${type}&page=${page}`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then((response) => {
            this.lastPage = response.data.lastPage
            this.allCategories = response.data.data.data
          })
      }catch(e){
        console.log(e)
      }
    },
    async addCategorie(name, type){
      try{
        const token = getToken()
        const response = await axios.post(`${ConfigUtil.getApiUrl()}/categories`,{
          name: name,
          type: type
        },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {

          if(response.data.status == "success"){
            this.allCategories = response.data.data.data
            this.lastPage = response.data.lastPage
            this.toast.success("Category added successfully");
          }

        })
      }catch(e){
        this.toast.error("Error adding category");
      }
    }
  }
})
