// import axios from "axios"

// export const setLocalStorageToken = (token: string) => {
//     return localStorage.setItem(
//         process.env.REACT_APP_LOCAL_TOKEN as string,
//         token
//     )
// }

// export const setAxiosDefaultAuthHeader = (token: string) => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// export const getLocalStorageToken = () => {
//     return localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN as string)
// }

// export const removeLocalStorageToken = () => {
//     return localStorage.removeItem(process.env.REACT_APP_LOCAL_TOKEN as string)
// }


export const toCapitalFirstLetter = (word: string) => word[0].toUpperCase() + word.substring(1)