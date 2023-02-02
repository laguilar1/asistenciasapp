// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'



export const useListStore = defineStore('list', () => {

  const list = ref({})

  const generateList = (data, date) => {
    data.forEach(school => {
        school.carreras.forEach(carrera => {
            carrera.materias.forEach(materia => {
               materia.salones.forEach(salon => {
                 const { vecesLista, idSalon, alumnos, tomadaLista } = salon
                //  console.log('salon ->', idSalon);
                //  console.log('veces ->', vecesLista);
                 for (let i = 0; i < vecesLista; i++) {
                   const num = i + 1
                  //  const newId = long(idSalon, num)
                   const newId = idSalon + '-' + num + '-' +date


                   list.value[newId] = []
                   alumnos.forEach(alumno => {
                      const {idAlumno, noCta, nombreCompleto, asistencia} = alumno
                      // console.log('alumno ', idAlumno, 'asistencia ', asistencia[num - 1])
                     list.value[newId].push(
                       {
                         'idAlumno': idAlumno,
                         'noCta': noCta,
                         'asistencia': asistencia[num - 1],
                         'enviado': (tomadaLista[num - 1] && asistencia[num - 1]) ? true : false,
                       }
                     );
                   });
                 }


               });
            });
        });
    });
  }
  const changeStatusList = (newId, idAlumno, status) => {
    status = parseInt(status)
    list.value[newId].forEach(element => {
      if (element.idAlumno === idAlumno) {
        element.asistencia = status
      }
    });
  }

  const getSendStatus = (newId, idAlumno) => {
    let send = false
    list.value[newId].forEach(element => {
      if (element.idAlumno === idAlumno) {
        send = element.enviado ? true : false
      }
    });
    return send
  }

  const changeStatusToSend = (newId, statusRoom) =>{
    statusRoom = parseInt(statusRoom)
    list.value[newId].forEach(student => {
      // Es enviado (true)
      // Si el estado clase es 1(enviado) y asistencia es 1(presente)
      let status = (statusRoom && student.asistencia === 1)
                    ? true
                    : false
      student.enviado = status

    });

  }

  // const isCompletelist = (newId) => {
  //   let status = true
  //   // Si hay un registro en false devuelve false
  //   list.value[newId].forEach(student => {
  //     if (!student.enviado) {
  //       status = false
  //     }
  //   });
  //   return status
  // }

   const cleanStore = () => {
        list.value = {};
    }

  return { list, generateList, changeStatusList, getSendStatus, changeStatusToSend, cleanStore}
})
