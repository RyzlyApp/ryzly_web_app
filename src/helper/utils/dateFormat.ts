import moment from "moment"

export function dateFormat(date: string) {
  return moment(date).format("ddd, MMMM Do YYYY")
} 

export function dateFormatHeader(date: string) {
  return moment(date).format("Do, MM YY")
} 

export function dateTimeFormat(date: string) {
  return moment(date).format("Do MMM YYYY h:mm A")
} 

export function dateFormatDashboad(date: string) {
  return moment(date).format("ddd, MM/DD/YY")
}

export function dateFormatMonthDay(date: string) {
  return moment(date).format("MMMM Do")
}

export function dateFormatMonth(date: string) {
  return moment(date).format("MMM")
}

export function dateFormatDay(date: string) {
  return moment(date).format("Do")
}

export const timeFormat = (isoString: string) =>
  moment(isoString).format("h.mm A")