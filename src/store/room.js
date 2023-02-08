// Utilities
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from "../store/user";

export const useRoomStore = defineStore('room', () => {

  const userStore = useUserStore()
  const room = ref({})

  const generateRoom = (data, date) => {
    data.forEach(school => {
        const {plantel, fecha} = school
      school.carreras.forEach(carrera => {
            const {planEstudio} = carrera
        carrera.materias.forEach(materia => {
              const {mat} = materia
               materia.salones.forEach(salon => {
                 const { vecesLista, idSalon, alumnos, nombreSalon } = salon
                //  console.log('salon ->', idSalon);
                //  console.log('veces ->', vecesLista);
                 for (let i = 0; i < vecesLista; i++) {
                   const num = i + 1
                   const newId = idSalon+'-'+num+ '-' +date
                   let numStudents = 0
                   const status = salon.tomadaLista[i];

                   room.value[newId] = {}
                   room.value[newId].status = status
                   room.value[newId].updated = 0
                   room.value[newId].plantel = plantel
                   room.value[newId].planEstudio = planEstudio
                   room.value[newId].materia = mat
                   room.value[newId].grado = nombreSalon
                   room.value[newId].disabled = true
                  //  room.value[newId].fecha = fecha
                  //  room.value[newId].students = 0

                   alumnos.forEach(alumno => {
                      numStudents ++
                   });

                   room.value[newId].students = numStudents
                 }


               });
          });
         disabledRoom()
        });
    });
  }

  // status, bandera para saber si ya a tomado lista
  const changeStatusRoom = (newId, status) => {
    status = parseInt(status)
    room.value[newId].status = status;
  }

  // updated, bandera para saber si hay cambios no guardados
  const changeUpdatedRoom = (newId, status) => {
    status = parseInt(status)
    room.value[newId].updated = status;
  }

  const getStatus =  (idSalon, hora, date) => {
    try {
      return room.value[idSalon + '-' + (hora)+'-'+date].status
    } catch(err) {
      console.log(err)
    }
  }

  const getStudents = (idSalon,date) => {
    try {
      // return room[idSalon + '-' + (hora)].status
      return room.value[idSalon + '-1-'+date].students

    } catch(err) {
      console.error('---',err)
    }
  }
  const getDate = (idSalon) => {
    try {
      // return room[idSalon + '-' + (hora)].status

      let fecha = room.value[idSalon + '-1'].fecha.split("-")
      return `${fecha[2]}/${fecha[1]}/${fecha[0]}`

    } catch(err) {
      console.error('---',err)
    }
  }

  const cleanStore = () => {
     room.value = {};
  }

  const getIdfromNewId = (newId) => {
    const idArray = newId.split('-')
    return idArray[0] + '-' + idArray[1] + '-' + idArray[2] + '-' + idArray[3] + '-' + idArray[4]
  }
  const getGroupRoom = () => {
    const {date} = userStore.user
    let arrayRoom = []
    let oldId = ''
    for (const property in room.value) {
      if (property.includes(date)) {
        // const idArray = property.split('-')
        const id = getIdfromNewId(property)
        if (id !== oldId) {
          arrayRoom.push(id)
          oldId = id
        }
      }
    }
    return arrayRoom
  }

  const disabledRoom = () => {
    const {date} = userStore.user
    console.log('Running disabledRooms')
    // Separar todas las claves de room
    const groupRoom = getGroupRoom()
    groupRoom.forEach(item => {
      let count = 1
      let oldStatus = 0
      // console.log('item-->', item)
      for (const property in room.value) {
        if (property.includes(date)) {

          if (property.includes(item)) {

            if (count === 1) {
              room.value[property].disabled = false
              oldStatus = room.value[property].status
            } else {

              if (oldStatus === 2 || oldStatus === 1 ) {
                room.value[property].disabled = false
              } else {
                room.value[property].disabled = true
              }
              oldStatus = room.value[property].status
            }

            count++

          }
        }
      }

    });

  }


  //Computed
  const countClosed = computed(() => {
    let n = 0
    for (const property in room.value) {
      let status = room.value[property].status
      if (status === 2) {n++}
      // console.log(`${property}: ${room.room[property].status}`);
    }
    return  n;
  });
  // En espera
  const onHold = computed(() => {
    let n = 0
    for (const property in room.value) {
      let status = room.value[property].status
      if (status === 0 || status === 2) {n++}
      // console.log(`${property}: ${room.room[property].status}`);
    }
    return  n;
  });




  return { room, generateRoom, changeStatusRoom, changeUpdatedRoom, getStatus, getStudents, getDate, cleanStore, countClosed, onHold, disabledRoom}
})
