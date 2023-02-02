
const useStatus = () => {

  const statusText = (status) => {
    status = status.toString()

    if (status === '1') { return 'Presente' }
    else if (status === '2') { return 'Retardo' }
    else if (status === '3') { return 'Falta' }
    return 'Justificado';
  }

  const statusColor = (status) => {
    status = status.toString()
    if (status === '1') { return 'green' }
    else if (status === '2') { return 'warning' }
    return 'red'
  }

  const statusColorlist = (status) => {
    status = status.toString()
    if (status === '0') { return 'grey' }
    else if (status === '2') { return 'warning' }
    return 'green'
  }

  const statusIcon = (status) => {
    status = status.toString()
    if (status === '1') { return 'mdi-check-circle-outline' }
    else if (status === '2') { return 'mdi-clock-outline' }
    return 'mdi-close-circle-outline'
  }

  const statusNext = (status) => {
    status = status.toString()
    if (status === '1') { return '2' }
    else if (status === '2') { return '3' }
    return '1';
  }

  return {
    statusIcon,
    statusColor,
    statusColorlist,
    statusText,
    statusNext,
  }
}

export default useStatus
