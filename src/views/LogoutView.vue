<script setup>
import { useUserStore } from "../store/user";
import useLogin from "../composables/useLogin";

const store = useUserStore()
const { loginUrl } = useLogin();

// Delete store
store.user.id = null;
store.user.name = null;
store.user.email = null;
store.user.surname = null;
store.user.login = false;
store.user.logoutUrl = null;

//Delete local storage
// localStorage.clear();
// localStorage.removeItem("user");
//Redirect
// window.location.href = loginUrl() + 'logout/';
window.location.href = loginUrl();


</script>

<template>
  <div class="about">
    <h1>This is logout page</h1>
  </div>
</template>

<style>

</style>
