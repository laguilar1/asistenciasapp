// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', () => {

  const list = ref({})

  const generateList = (data) => {
    data.forEach(school => {
        school.carreras.forEach(carrera => {
            carrera.materias.forEach(materia => {
               materia.salones.forEach(salon => {
                 const { vecesLista, idSalon, alumnos } = salon
                //  console.log('salon ->', idSalon);
                //  console.log('veces ->', vecesLista);
                 for (let i = 0; i < vecesLista; i++) {
                   const num = i + 1
                   const newId = idSalon+'-'+num

                   list.value[newId] = []
                   alumnos.forEach(alumno => {
                      const {idAlumno, noCta, nombreCompleto, asistencia} = alumno
                      // console.log('alumno ', idAlumno, 'asistencia ', asistencia[num - 1])
                     list.value[newId].push(
                       {
                         'idAlumno': idAlumno,
                         'noCta': noCta,
                         'asistencia': asistencia[num - 1],
                       }
                     );
                   });
                 }


               });
            });
        });
      });
    //  console.log('Generando List',list.value)
  }

  return { list, generateList}
})
