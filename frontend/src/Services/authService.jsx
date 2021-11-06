import http from './httpService';

export async function login(data) {
    const response = await http.postMethod('/api/v1/login', {
        email: data.email,
        password: data.password,
    });
    if (response && response.data) {
        setApiToken(response.data.apiToken);
    }
    return response;
}

export function setApiToken(apiToken) {
    localStorage.setItem('apiToken', apiToken);
}

export function getApiToken() {
    return localStorage.getItem('apiToken');
}

export function getUserInfo() {
    return JSON.parse(localStorage.getItem('user'));
}
  
export function setUserInfo(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export default {
    login,
    setApiToken,
    getApiToken,
    getUserInfo,
    setUserInfo,
}