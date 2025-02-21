export const pagination = (itemsInPage: number, dataLength: number) => {
    return Math.round(dataLength / itemsInPage)
}
export const percentDiscount = (discount: number, price: number) => {
    return price - ((price * discount) / 100)
}
export const formatDate = (date:string) => {
    return date.split("T")[0].split("-").reverse().join("/")
}
