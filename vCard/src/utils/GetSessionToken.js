export const getToken = () => {

    const token = sessionStorage.getItem('token');

    if (!token) {
        throw new Error('No token found!');
    }

    return token;
}