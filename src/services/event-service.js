import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    GetAllFiltered,
    add,
    update,
    GetEvent,
    remove
}

function GetAllFiltered(options) {
    return axios.post(`${endpoint}/events/GetAllFiltered`, options)
        .then((data) => data.data, (error) => { return error});
}

function GetEvent(id) {
    return axios.get(`${endpoint}/events/${id}`)
        .then((data) => data.data, (error) => { return error});
}

function add(events) {
    return axios.post(`${endpoint}/events`, events).then(
        (response) => response.data,
        (error) => { return error });
}

function update(events) {
    return axios.put(`${endpoint}/events`, events).then(
        (response) => response.data,
        (error) => { return error; });
}

function remove(eventId) {
    return axios.delete(`${endpoint}/events/${eventId}`).then(
        (response) => response.data,
        (error) => { return error; });
}