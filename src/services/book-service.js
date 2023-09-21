import axios from 'axios';
const endpoint = "http://localhost:8000";

export default {
    GetAll,
    createBooking,
    remove
}

function GetAll(eventId) {
    return axios.get(`${endpoint}/book/GetAll/${eventId}`)
        .then((data) => data.data, (error) => { return error});
}

function createBooking(eventId, userId) {
    return axios.post(`${endpoint}/book/${eventId}/${userId}`).then(
        (response) => response.data,
        (error) => { return error });
}

function remove(bookId) {
    return axios.delete(`${endpoint}/book/${bookId}`).then(
        (response) => response.data,
        (error) => { return error; });
}