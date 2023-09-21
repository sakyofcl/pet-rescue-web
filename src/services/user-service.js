import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    loginUser,
    add,
    saveUserInLocalStorage,
    clearLocalStorage,
    getUserFromLocalStorage
}


function add(user) {
    return axios.post(`${endpoint}/user`, user).then(
        (response) => response.data,
        (error) => { return error });
}

function loginUser(user) {
    return axios.post(`${endpoint}/user/login`, user).then(
        (response) => response.data,
        (error) => { return error });
}

function saveUserInLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function clearLocalStorage() {
    localStorage.clear();
}

function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("user"));
}

