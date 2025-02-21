export const login = async (data: {username:string,password:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/login/admin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}
export const authToken = async(token:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
    })
}
