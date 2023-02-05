<script setup>
  import router from '@/router'
  import { useRoute } from 'vue-router';
  import { useUserStore } from "../store/user";

  import useLogin from "../composables/useLogin";
  import useDate from "../composables/useDate";

  // Si entra a esta seccion es porque ya esta autenticado
  const route = useRoute()
  const store = useUserStore()
  const { loginUrl } = useLogin();
  const { today } = useDate();

  const { id, name, email, surname, token } = route.query

  console.log('store params in pinia -------------------------------');
  store.user.id = id;
  store.user.name = name;
  store.user.email = email;
  store.user.surname = surname;
  store.user.login = true;
  store.user.date = today();
  store.user.token = token;

  setTimeout(() => {
    router.push({ path: '/' });
    // window.location.href = loginUrl() + '/home';
  }, 100);


</script>
<template>

</template>


