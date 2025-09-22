
export const formatNumberWithK = (number: number, symbol?: boolean, prefix = "$") =>{
    if(number === 0 || !number) {
        return "0"
    } else {
        return (symbol ? (prefix) : "")+(number > 999999 ? `${Math.trunc(number / 1000000)}million` : number > 999 ? `${Math.trunc(number / 1000)}k` : number)
    }
}

export const numberFormatNaire = (x: number) => { 
    return "₦"+Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
};
 
export const numberFormatDollar = (x: number) => { 
    return "$"+Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
};
 
export const numberFormat = (x: number) => { 
    return Number(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
};