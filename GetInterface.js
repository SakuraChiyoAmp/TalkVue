import axios from "axios"
import store from "./src/store"
import router from "./src/router"
 var GetMsg=axios.create({
     timeout:5000,
     headers:{ 'Content-Type': 'application/json;charset=UTF-8' },
     withCredentials: true,
 });
 GetMsg.interceptors.response.use(response=>{
  return response;
},error=>{
  if(error.response){
    switch(error.response.status){
      case 401:
        alert("您的会话已经超时，请重新登陆");
        store.state.UserName=null;
        store.state.token=null;
        router.push({
          path: `/Login`,
        })
    }
  }
})

GetMsg.interceptors.request.use(
  config => {
 if (store.state.token) {
  config.headers.Authorization = `token ${store.state.token}`;
 }
 return config;
}

);
export default{
  GetUserInfo(UserName){
    return GetMsg.get("http://localhost:3000/GetUserInfo",{params:{UserName}});
  },
  GetUserFriend(UserName){
    return GetMsg.get("http://localhost:3000/GetUserFriend",{params:{UserName}});
  },
  GetIfFriend(UserName,OtherUserName){
    return GetMsg.get("http://localhost:3000/GetIfFriend",{params:{UserName,OtherUserName}});
  },
  GetFriendRequestList(UserName){
    return GetMsg.get("http://localhost:3000/GetFriendRequestList",{params:{UserName}})
  },
  GetMessageList(UserName){
    return GetMsg.get("http://localhost:3000/GetMessageList",{params:{UserName}})
  },
  GetTalkMessage(UserName,OtherUserName){
    return GetMsg.get("http://localhost:3000/GetTalkMessage",{params:{UserName,OtherUserName}})
  },
  SearchFriend(UserName,OtherUserName){
    return GetMsg.get("http://localhost:3000/SearchFriend",{params:{UserName,OtherUserName}})
  },
  SearchNewFriend(UserName,OtherUserName){
    return GetMsg.get("http://localhost:3000/SearchNewFriend",{params:{UserName,OtherUserName}})
  }
} 