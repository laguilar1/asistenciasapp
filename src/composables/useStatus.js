
const useStatus = () => {

  const statusText = (status) => {
    if (status === '1') { return 'Asistencia' }
    else if (status === '2') { return 'Retardo' }
    else if (status === '3') { return 'Falta' }
    return 'Justificado';
  }

  const statusColor = (status) => {
    if (status === '1') { return 'green' }
    else if (status === '2') { return 'warning' }
    return 'red'
  }

  const statusIcon = (status) => {
    if (status === '1') { return 'mdi-check-circle-outline' }
    else if (status === '2') { return 'mdi-clock-outline' }
    return 'mdi-close-circle-outline'
  }

  const statusNext = (status) => {
    if (status === '1') { return '2' }
    else if (status === '2') { return '3' }
    return '1';
  }

  return {
    statusIcon,
    statusColor,
    statusText,
    statusNext,
  }
}

export default useStatus
