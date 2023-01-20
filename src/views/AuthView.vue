<script setup>

  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from "../store/user";

  import useLogin from "../composables/useLogin";

  const router = useRouter()
  const route = useRoute()
  const store = useUserStore()
  const { loginUrl } = useLogin();

  // TODO: Obtener la ruta de donde vienen los datos
  console.log('get name page before');
  console.log(router.options.history.state.back, '-- back')

  // TODO: Get parameters
  console.log('get the params');
  // const { id, name, email } = route.params
  const { id, name, email, surname } = route.query

  console.log('store params in pinia -------------------------------');
  store.user.id = id;
  store.user.name = name;
  store.user.email = email;
  store.user.surname = surname;
  store.user.login = true;



  console.log(store.user.email, 'store email');
  console.log(store.user.name, 'store name');

  // TODO: Redirect
  // router.replace({ path: '/' });
  console.log(loginUrl());

  if (store.user.login) {
    router.replace({ path: '/' });
  } else {
    //Redirect si no hay session
    window.location.href = loginUrl()+'/';
  }


</script>
<template>


  This is an Auth view page



</template>


