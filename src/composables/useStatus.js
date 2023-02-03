
const useStatus = () => {

  const statusText = (status) => {
    const type = typeof(status)
    status = (type === 'number') ? status.toString() : status
    if (status === '1') { return 'Presente' }
    else if (status === '2') { return 'Retardo' }
    else if (status === '3') { return 'Falta' }
    return 'Justificado';
  }

  const statusColor = (status) => {
    const type = typeof(status)
    status = (type === 'number') ? status.toString() : status
    if (status === '1') { return 'green' }
    else if (status === '2') { return 'warning' }
    return 'red'
  }

  const statusColorList = (status) => {
    const type = typeof(status)
    status = (type === 'number') ? status.toString() : status
    if (status === '0') { return 'grey' }
    else if (status === '2') { return 'warning' }
    return 'green'
  }

  const statusTextList = (status) => {
    const type = typeof(status)
    status = (type === 'number') ? status.toString() : status

    if (status === '0') { return 'no enviado' }
    else if (status === '2') { return 'cerrado' }
    return 'enviado'
  }

  const statusIcon = (status) => {
    const type = typeof(status)
    status = (type === 'number') ? status.toString() : status
    if (status === '1') { return 'mdi-check-circle-outline' }
    else if (status === '2') { return 'mdi-clock-outline' }
    return 'mdi-close-circle-outline'
  }

  const statusNext = (status) => {
    const type = typeof(status)
    status = (type === 'number') ? status.toString() : status
    if (status === '1') { return '2' }
    else if (status === '2') { return '3' }
    return '1';
  }

  return {
    statusIcon,
    statusColor,
    statusColorList,
    statusTextList,
    statusText,
    statusNext,
  }
}

export default useStatus
