import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    GetAllFiltered,
    add,
    remove
}

function GetAllFiltered() {
    return axios.get(`${endpoint}/contact/GetAll`)
        .then((data) => data.data, (error) => { return error});
}

function add(contact) {
    return axios.post(`${endpoint}/contact`, contact).then(
        (response) => response.data,
        (error) => { return error });
}

function remove(contactId) {
    return axios.delete(`${endpoint}/contact/${contactId}`).then(
        (response) => response.data,
        (error) => { return error; });
}