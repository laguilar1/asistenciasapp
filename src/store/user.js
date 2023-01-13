import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';


export const useUserStore = defineStore('user', () => {
 
  const user = ref(useLocalStorage('user', {
      id: null,
      name: null,
      email: null,
      surname: null,
      login: false,
      logoutUrl: null,
    })
  );
  // const user = ref({
  //   id: 1234,
  //   name: "Example Name",
  //   email: "example@email.com"
  // })

  const changeName = (newName) => {
    user.value.name = newName;
  }
  
  const changeSurName = (newSurName) => {
    user.value.surname = newSurName;
  }

  const changeEmail = (newEmail) => {
    user.value.email = newEmail;
  }

  const changeId = (newId) => {
    user.value.id = newId;
  }
  
  const changeLogin = (newLogin) => {
    user.value.login = newLogin;
  }
  
  const changeLogoutUrl = (newLogoutUrl) => {
    user.value.logoutUrl = newLogoutUrl;
  }
  
  

  // persistencia de user o todo el state
  // if (localStorage.getItem("user")) {
  //   user.value = JSON.parse(localStorage.getItem("user"));
  //   //persistencia con useLocalStorage
  // }
  // if (localStorage.getItem("state")) {
  //   pinia.state.value = JSON.parse(localStorage.getItem("state"));
  // }

  // watch(
  //   // user,       //watch only user state
  //   pinia.state, //watch all state
  //   // (userVal) => {localStorage.setItem("user", JSON.stringify(userVal));},
  //   (userVal) => { user = useLocalStorage('user', 'John'); },//obtener el valor

  //   // ()=>pinia.state.value.user, //ARROW FUNCION NEEDED
  //   // (state) => { localStorage.setItem("state", JSON.stringify(state)); },
  //   { deep: true }

    
    
  // )


  //persitencia con 

  return { user, changeName, changeEmail, changeId, changeSurName, changeLogin, changeLogoutUrl }
})
