import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    GetAllFiltered,
    GetAllPetTypes,
    add,
    update,
    GetPet,
    remove
}

function GetAllFiltered(options) {
    return axios.post(`${endpoint}/pet/GetAllFiltered`, options)
        .then((data) => data.data, (error) => { return error});
}

function GetAllPetTypes() {
    return axios.get(`${endpoint}/pettype/GetAll`)
        .then((data) => data.data, (error) => { return error});
}

function GetPet(id) {
    return axios.get(`${endpoint}/pet/${id}`)
        .then((data) => data.data, (error) => { return error});
}

function add(pet) {
    return axios.post(`${endpoint}/pet`, pet).then(
        (response) => response.data,
        (error) => { return error });
}

function update(pet) {
    return axios.put(`${endpoint}/pet`, pet).then(
        (response) => response.data,
        (error) => { return error; });
}

function remove(petId) {
    return axios.delete(`${endpoint}/pet/${petId}`).then(
        (response) => response.data,
        (error) => { return error; });
}