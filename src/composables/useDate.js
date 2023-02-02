
const useDate = () => {


  const today  = () => {
    const d = new Date();
    let month = parseInt(d.getMonth()) + 1;
    month = (month < 10 ) ? '0'+month : month
    let year = d.getFullYear();
    let day = d.getDate();
    day = (day < 10 ) ? '0'+day : day
    let full = year + '-' + month + '-' + day
    return full
  }

  const ddmmyyyy = (date) => {
    const dateArray = date.split("-")
    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]
    let format = day + '-' + month + '-' + year
    return format
  }

  return {
    today,
    ddmmyyyy,
  }
}

export default useDate
