import router from '@/router'
import { inject, ref } from 'vue';

import { useDataStore } from "../store/data";
import { useStudentStore } from "../store/student";
import { useListStore } from "../store/list";
import { useRoomStore } from "../store/room";
import { useUserStore } from "../store/user";
import useLogin from "../composables/useLogin";

// import useSchool from '../composables/useSchool';

const useRefresh = () => {

  const axios = inject('axios')  // inject

  const dataStore = useDataStore()
  const studentStore = useStudentStore()
  const listStore = useListStore()
  const roomStore = useRoomStore()
  const userStore = useUserStore()
  // const { getMainData } = useSchool();
  const { loginUrl } = useLogin();

  const dialogRefresh = ref(false);
  const loadingRefresh = ref(false);
  const disabledRefresh = ref(false);


  const refresh = () => {

    const id = userStore.user.id
    disabledRefresh.value = true
    axios.get('profesores/asistencia/'+id+'/actualizar')
      .then((response) => {
          if (response.statusText === 'OK') {
            deleteCache()
            localStorage.setItem('reset', '1');
          } else {
            console.log('error endpoint')
          }
        }).catch((error) => {
          console.error('Error en la petición', error)
          disabledRefresh.value = false
        });
  }

  const deleteCache = () => {

    // Borrar caché local-api-cache
     const name = 'local-api-cache'
      caches.has(name).then(cache => {
        if (cache) {
          caches.delete(name)
            .then((resp) => {
              console.log('eliminado', resp)
              if (resp) {
                // Borrar los storages de pinia
                dataStore.cleanStore()
                listStore.cleanStore()
                studentStore.cleanStore()
                roomStore.cleanStore()
                window.location.href = loginUrl() + '/home/';
              }
            })
            .catch((err) => {
              console.error(err)
            }); //para que no de error
          console.log('se eliminó caché')
        }

        //Rellenar datos
        // getMainData()
        // loadingRefresh.value = false
        // Redireccionar
      }).catch(function () {
        console.log(err);
      });
  }

  return {
    refresh,
    dialogRefresh,
    loadingRefresh,
    disabledRefresh,
  }
}

export default useRefresh
