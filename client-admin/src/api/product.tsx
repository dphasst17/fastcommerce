export const productGetAll = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product`)
    .then(res => res.json())
}
export const productGetDetail = async(obj:{nameType:string,idProduct:string | number}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/detail/${obj.nameType}/${obj.idProduct}`)
    .then(res => res.json())
}
export const productUpdate = async(data:{tableName:string,condition:{name:string,value:string | number},data_update:any}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const getColByType = async(type:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/col/${type}`)
    .then(res => res.json())
}
export const getAllCategoryProduct = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/types`)
    .then(res => res.json())
}