export const setLocalStorageToken = (token: string) => {
    return localStorage.setItem(
        process.env.REACT_APP_LOCAL_TOKEN as string,
        token
    )
}

export const getLocalStorageToken = () => {
    return localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN as string)
}