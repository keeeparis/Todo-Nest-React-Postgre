export const setLocalStorageToken = (token: string) => {
    return localStorage.setItem(
        process.env.REACT_APP_LOCAL_TOKEN as string,
        token
    )
}