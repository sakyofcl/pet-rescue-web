import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    GetAll,
    add,
    remove
}

function GetAll() {
    return axios.get(`${endpoint}/inform/GetAll`)
        .then((data) => data.data, (error) => { return error});
}

function add(inform) {
    return axios.post(`${endpoint}/inform`, inform).then(
        (response) => response.data,
        (error) => { return error });
}

function remove(informId) {
    return axios.delete(`${endpoint}/inform/${informId}`).then(
        (response) => response.data,
        (error) => { return error; });
}