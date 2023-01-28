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
                 const { vecesLista, idSalon, alumnos, tomadaLista } = salon
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

  return { list, generateList, changeStatusList, getSendStatus, changeStatusToSend}
})
