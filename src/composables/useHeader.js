import { useUserStore } from "../store/user";
import { useListStore } from "../store/list";
const useHeader = () => {

  const userStore = useUserStore()
  const listStore = useListStore()

  const config = {
    headers: {
      'ElGrandToken': userStore.user.token
    }
  }

  const getDateNewId = (newId) => {
    const arrayNewId = newId.split('-');
    return arrayNewId[6] + '-' + arrayNewId[7] + '-' + arrayNewId[8]
  }

  const getHoraNewId = (newId) => {
    const arrayNewId = newId.split('-');
    return arrayNewId[5]
  }

  const getSalonNewId = (newId) => {
    const arrayNewId = newId.split('-');
    return arrayNewId[0] + '-' + arrayNewId[1] + '-' + arrayNewId[2] + '-' + arrayNewId[3] + '-' + arrayNewId[4]
  }

  const getAlumnos = (newId)=>{

    // listStore.list[newId]
    // console.log('getAlumnos ... ', listStore.list[newId])
    return listStore.list[newId].map((alumn) => {
      // console.log(alumn.asistencia)
      return {
        'idRAlumnoSalonMateria': alumn.idAlumno,
        // 'idRAlumnoSalonMateria': alumn.noCta
        'estatus': alumn.asistencia
      }
    })
  }

  const getDataRequest = (newId) => {

    console.log('Preparing Data ....', newId)

    const asistencias = {
        "numTrabajador": userStore.user.id,
        "idSalon": getSalonNewId(newId),
        "fecha": getDateNewId(newId),
        "toma": getHoraNewId(newId),
        "alumnos": getAlumnos(newId)
    }

    return {
      'asistencias': [
        asistencias
      ]
    }
  }

  return {
    config,
    getDataRequest,
    getSalonNewId,
    getDateNewId,
    getHoraNewId,
    getAlumnos,
  }
}

export default useHeader
