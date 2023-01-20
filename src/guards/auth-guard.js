import { useUserStore } from "../store/user";
import useLogin  from "../composables/useLogin";
import localforage from "localforage";

const { loginUrl } = useLogin();

const authGuard = async (to, from, next) => {

  const store = useUserStore();
  console.log('guard de auth');
  //Es Async
  try {
    // Si existe la bd tiene session
    const value = await localforage.getItem('user');
    return value ? next() : window.location.href = loginUrl();
  } catch (err) { console.log(err); }

  // Sync Si no está logeado entonces entre a logearse
  // if (store.user.login) {
  //   return next()
  // }
  // else {
  //   window.location.href = loginUrl();
  //   // return false
  // }

}
export default authGuard
