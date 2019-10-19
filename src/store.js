import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:window.sessionStorage.getItem("token"),
    UserName:window.sessionStorage.getItem("UserName"),
    FriendRequestList:window.sessionStorage.getItem("FriendRequestList"),
    MessageList:window.sessionStorage.getItem("MessageList"),
  
  },
  mutations: {
    TOKEN:(state,data)=>{
      state.token=data;
      window.sessionStorage.setItem("token",data);
    },
    LOGOUT:(state)=>{
      state.token="";
      window.sessionStorage.removeItem("token");
      state.UserName="";
      window.sessionStorage.removeItem("UserName");
      state.FriendRequestList=[];
      window.sessionStorage.removeItem("FriendRequestList");
      state.MessageList=[];
      window.sessionStorage.removeItem("MessageList");
    },
    USERNAME:(state,data)=>{
      state.UserName=data;
      window.sessionStorage.setItem("UserName",data);
    }
  },
  actions: {
    UserToken({commit},data){
      commit("TOKEN",data);
    },
    UserLogout({commit}){
      commit("LOGOUT");
    },
    UserName({commit},data){
      commit("USERNAME",data);
    }
  }
})
