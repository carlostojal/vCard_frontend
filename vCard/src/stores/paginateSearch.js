import { defineStore } from 'pinia'
import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil'
import { getToken } from '@/utils/GetSessionToken'

export const usePaginateSearchStore = defineStore('paginateSearch', {
  state: () => ({
    query: null,
    blocked: 'all',
    trans_type: 'all',
    categorie_type: 'all',
  }),
  actions: {},
  mutations: {}
})