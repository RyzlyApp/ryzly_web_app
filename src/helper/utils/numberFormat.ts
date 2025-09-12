import formatter from "format-number"


export const formatNumber = (number: number, prefix = "₦") => {
  // if(number === "***") {
  //   return prefix+" ****"
  // } else {
    return(
      formatter({ prefix })(number)
    )
  // }
}
  