import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {


  // const user = ref(useLocalStorage('user', {
  //     id: null,
  //     name: null,
  //     email: null,
  //     surname: null,
  //     login: false,
  //
  //   })
  // );
  const user = ref({
      id: null,
      name: null,
      email: null,
      surname: null,
      login: false,
      date: ''

  })

  // ref()s become state properties
  // computed()s become getters
  // function()s become actions

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

  const cleanStore = () => {
      user.value.id = null;
      user.value.name = null;
      user.value.email = null;
      user.value.surname = null;
      user.value.login = false;

  }

  //persitencia con

  return {
    user,
    changeName,
    changeEmail,
    changeId,
    changeSurName,
    changeLogin,
    cleanStore,
  }
})
