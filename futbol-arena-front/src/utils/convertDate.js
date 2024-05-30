export const convertDate = (date) => {
    const splitDate = date.toLocaleDateString().split('/')
    for(let i=0; i<=2; i++){
        if(splitDate[i].length < 2){
        splitDate[i] = splitDate[i].concat('0').split('').reverse().join('')
        }
    }
    return splitDate.join('/')
}