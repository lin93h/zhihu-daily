/**
 * Created by Administrator on 2017/7/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  url: {
    stores: '/news/latest'
  },
  themesList: {},
  storeList: {}
}

const getters = {
  getInfo: state => {
    axios({
      url: state.url.stores,
      method: 'get',
      withCredentials: true
    }).then(function (data) {
      console.log(data);
    }).catch (function(err) {
      console.log(err)
    })
  }
}

export default new Vuex.Store({
  state,
  getters
})
