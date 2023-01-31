
const useDate = () => {


  const today  = () => {
    const d = new Date();
    let month = parseInt(d.getMonth()) + 1;
    month = (month < 10 ) ? '0'+month : month
    let year = d.getFullYear();
    let day = d.getDate();
    let full = year+ '-' + month+ '-' +day
    return full
  }

  return {
    today,
  }
}

export default useDate
