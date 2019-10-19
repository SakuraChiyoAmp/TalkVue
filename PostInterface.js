import axios from "axios"
import store from "./src/store"
 var PostSmg=axios.create({
     timeout:5000,
     headers:{ 'Content-Type': 'application/json;charset=UTF-8' },
     withCredentials: true,
 });
 PostSmg.interceptors.request.use(
    config => {
   if (store.state.token) {
    config.headers.Authorization = `token ${store.state.token}`;
   }
   return config;
  }
 
 );


 PostSmg.interceptors.response.use(response=>{
  return response;
},error=>{
  if(error.response){
    switch(error.response.status){
      case 401:
          store.state.UserName=null; 
          store.state.token=null;
        alert("您的会话已经超时，请重新登陆");
        this.$router.replace("/Login")
    }
  }
})
export default{
  AddFriend(UserName,OtherUserName){
    return PostSmg.post("http://localhost:3000/AddFriend",{UserName,OtherUserName});
  },
  AddFriendSuccess(UserName,OtherUserName){
    return PostSmg.post("http://localhost:3000/AddFriendSuccess",{UserName,OtherUserName});
  },
  PostTalk(UserName,OtherUserName,Message,Date,Flag){
    return PostSmg.post("http://localhost:3000/PostTalk",{UserName,OtherUserName,Message,Date,Flag});
  },
  LogOut(UserName){
    return PostSmg.post("http://localhost:3000/LogOut",{UserName});
  },
  ChangeNickUserName(UserName,NickUserName){
    return PostSmg.post("http://localhost:3000/ChangeNickUserName",{UserName,NickUserName});
  },
  DeleteFriend(UserName,OtherUserName){
    return PostSmg.post("http://localhost:3000/DeleteFriend",{UserName,OtherUserName});
  },
  ClearMessage(UserName,OtherUserName){
    return PostSmg.post("http://localhost:3000/ClearMessage",{UserName,OtherUserName});
  }
 
} 