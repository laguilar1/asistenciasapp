import { inject, ref } from 'vue';
import { useDataStore } from "../store/data";
import { useStudentStore } from "../store/student";
import { useListStore } from "../store/list";


const dataStore = useDataStore()
const studentStore = useStudentStore()
const listStore = useListStore()

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

            // TODO: Generate attendance list
            listStore.getList()
            listStore.list = {hola:'Hi'}

            loading.value = false;
          }
        }).catch((error) => {
          console.error('Error en la petición', error)
          loading.value = false;
          errorLoading.value = true;
        });
    }, 1000);
  };

  const searchAlumns = (id_salon) => {
    const { schools } = dataStore;
    schools.forEach(school => {
      school.carreras.forEach(carrera => {
          carrera.materias.forEach(materia => {
             materia.salones.forEach(salon => {
               console.log(salon)
               if (salon.idSalon === id_salon) {
                 console.log('alumnos: ',salon.alumnos)
               }
             });
          });
      });

    });
    return "Busqueda de alumnos de " + id_salon
  }

  return {
    loading,
    fetchSchool,
    errorLoading,
    searchAlumns,
  }
}

export default useSchool
