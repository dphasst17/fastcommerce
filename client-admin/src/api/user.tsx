export const getInfo = async (token:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/user/admin`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const getUser = async () => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/user/u`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
}

export const getStaff = async (token: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/user/s`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}

export const getAddress = async () => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/user/address`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
}
