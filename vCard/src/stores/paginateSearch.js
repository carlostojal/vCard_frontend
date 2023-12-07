import { defineStore } from 'pinia'

export const usePaginateSearchStore = defineStore('paginateSearch', {
  state: () => ({
    query: null,
    blocked: 'all',
    trans_type: 'all',
    categorie_type: 'all',
    myTrans_type: 'all',
  }),
  actions: {},
  mutations: {}
})