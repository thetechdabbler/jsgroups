export const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
}