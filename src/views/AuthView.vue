<script setup>
  import router from '@/router'
  import { useRoute } from 'vue-router';
  import { useUserStore } from "../store/user";

  import useLogin from "../composables/useLogin";

  // Si entra a esta seccion es porque ya esta autenticado
  const route = useRoute()
  const store = useUserStore()
  const { loginUrl } = useLogin();

  const { id, name, email, surname } = route.query

  console.log('store params in pinia -------------------------------');
  store.user.id = id;
  store.user.name = name;
  store.user.email = email;
  store.user.surname = surname;
  store.user.login = true;

  setTimeout(() => {
    router.push({ path: '/' });
    // window.location.href = loginUrl() + '/home';
  }, 100);


</script>
<template>

</template>


