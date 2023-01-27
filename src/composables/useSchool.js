import { inject, ref } from 'vue';
import { useDataStore } from "../store/data";
import { useStudentStore } from "../store/student";
import { useListStore } from "../store/list";
import { useRoomStore } from "../store/room";


const dataStore = useDataStore()
const studentStore = useStudentStore()
const listStore = useListStore()
const roomStore = useRoomStore()

const useSchool = () => {
  const axios = inject('axios')  // inject axios
  // .get('https://jsonplaceholder.typicode.com/users')
  const loading = ref(false);
  const errorLoading = ref(false);

  // console.log('url back: ',import.meta.env.VITE_URL_BACK);


  const fetchSchool = () => {

    loading.value = true;
    errorLoading.value = false;

    setTimeout(() => {
      axios.get('/profesores/asistencia/3105')
        .then((response) => {
          if (response.statusText === 'OK') {

            dataStore.loadSchools(response.data.datos)

            // Generate students list
            const students = studentStore.getStudents(response.data.datos)
            studentStore.students = students

            // Generate attendance list
            listStore.generateList(response.data.datos)

            // Generate rooms
            roomStore.generateRoom(response.data.datos)


            loading.value = false;
          }
        }).catch((error) => {
          console.error('Error en la petición', error)
          loading.value = false;
          errorLoading.value = true;
        });
    }, 800);
  };


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
  }
}

export default useSchool
