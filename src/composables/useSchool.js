import { inject, ref } from 'vue';
import { useDataStore } from "../store/data";
import { useStudentStore } from "../store/student";
import { useListStore } from "../store/list";
import { useRoomStore } from "../store/room";

import useDate from '../composables/useDate'


import localforage from "localforage";


const dataStore = useDataStore()
const studentStore = useStudentStore()
const listStore = useListStore()
const roomStore = useRoomStore()

const { today } = useDate();

const useSchool = () => {
  const axios = inject('axios')  // inject axios
  // .get('https://jsonplaceholder.typicode.com/users')
  const loading = ref(false);
  const errorLoading = ref(false);

  // console.log('url back: ',import.meta.env.VITE_URL_BACK);

  // const removeItems = async () => {
  //   try {
  //     await localforage.removeItem('data');
  //     await localforage.removeItem('list');
  //     await localforage.removeItem('room');
  //     await localforage.removeItem('student');
  //     getMainData()
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  const fetchSchool = () => {

    loading.value = true;
    errorLoading.value = false;

    // MODO 1  - Aqui disminuye el aumento de indexDB
    // Eliminar todas las keys y como la petición
    // Esta con caché entonces restaura todo sin hacer peticion extra
    // removeItems().then(function() {
    //   console.log('All keys was deleted!');
    // }).catch(function (err) { console.log(err); });


    // MODO 2 - Aqui si hay aumento del indexDB
    // localforage.getItem('data')
    //     .then((data) => {
    //       // Si existe indexDB no hace petición
    //       if (!data) {
    //         getMainData()
    //       } else {
    //         console.log('Datos restaurados desde local: ');
    //         //Redireccionar a home
    //         loading.value = false;
    //       }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let reset = localStorage.getItem('reset');
    reset = parseInt(reset)
    // console.log('reset: ', reset)
    // console.log('reset typefo: ', typeof(reset))
      // MODO 3, CHECAR SI EXISTE EL CACHÉ (petición)
    caches.has('local-api-cache').then(function (hasCache) {
      console.log('checar contenido caché ',hasCache)
        if (!hasCache || reset) {
          getMainData(today())
          localStorage.setItem('reset', '0');
          console.log('No existe caché o está en reset, hace petición');
        } else {
          localStorage.setItem('reset', '0');
          console.log('SI existe caché Datos restaurados desde local:')
          loading.value = false;
          // caches.delete('local-api-cache');
        }
      }).catch(function(err) {
        console.log(err);
      });
  };

  const getMainData = (date) => {
    setTimeout(() => {
      axios.get('/profesores/asistencia/2775')
        .then((response) => {
          if (response.statusText === 'OK') {

            dataStore.loadSchools(response.data.datos)

            // Generate students list
            const students = studentStore.getStudents(response.data.datos)
            studentStore.students = students

            // Generate attendance list
            listStore.generateList(response.data.datos, date)

            // Generate rooms
            roomStore.generateRoom(response.data.datos, date)

            loading.value = false;
          }
        }).catch((error) => {
          console.error('Error en la petición', error)
          loading.value = false;
          errorLoading.value = true;
        });
    }, 1000);
  }

  // Obtener los status de las horas del salón
  const searchStatusHours = (id_salon) => {

    const { schools } = dataStore;
    let tomada = {};
    let counter = 1;
     schools.forEach(school => {
       school.carreras.forEach(carrera => {
           carrera.materias.forEach(materia => {
              materia.salones.forEach(salon => {
               if (salon.idSalon === id_salon) {
                 salon.tomadaLista.forEach(element => {
                   tomada[counter++] = element
                 });
               }
             });
          });
      });

    });
    return tomada; //regresa un objeto
  }

  return {
    loading,
    fetchSchool,
    errorLoading,
    searchStatusHours,
    getMainData,
  }
}

export default useSchool
