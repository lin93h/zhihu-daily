/**
 * Created by Administrator on 2017/7/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  url: {
    stores: '/news/latest',
    themes: '/themes'
  },
  themesList: {},
  storeList: {}
}

const getters = {
  getStores: state => {
    axios({
      url: state.url.stores,
      method: 'get',
      withCredentials: true
    }).then(function (res) {
      state.storeList = res.data.stories;
      //return state.storeList;
    }).catch (function(err) {
      console.log(err)
    })
  },
  getThemes: state => {
    axios({
      url: state.url.themes,
      method: 'get',
      withCredentials: true
    }).then(function (res) {
      console.log(res);
    }).catch(function (err) {
      console.log(err);
    })
  }
}


export default new Vuex.Store({
  state,
  getters
})
