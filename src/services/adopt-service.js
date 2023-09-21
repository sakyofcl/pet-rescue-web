import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    GetAll,
    createAdoptRequest,
    remove,
    approvedAdoptRequest
}

function GetAll(petId) {
    return axios.get(`${endpoint}/adopt/GetAll/${petId}`)
        .then((data) => data.data, (error) => { return error});
}

function createAdoptRequest(petId, userId) {
    return axios.post(`${endpoint}/adopt/${petId}/${userId}`).then(
        (response) => response.data,
        (error) => { return error });
}

function remove(adoptId) {
    return axios.delete(`${endpoint}/adopt/${adoptId}`).then(
        (response) => response.data,
        (error) => { return error; });
}

function approvedAdoptRequest(adoptId) {
    return axios.get(`${endpoint}/adopt/approved/${adoptId}`)
        .then((data) => data.data, (error) => { return error});
}
