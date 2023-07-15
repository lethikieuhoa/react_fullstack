import axios from "../axios";
const handleLogiApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUser = (inputId) => {
    //template string ES6
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}
const deleteUserService = (idInput) => {
    //console.log('id service: ', idInput)
    return axios.delete('/api/delete-user', { data: { id: idInput } });
}
const EditUserService = (data) => {
    return axios.put('/api/edit-user', data);
}
export { handleLogiApi, getAllUser, createNewUserService, deleteUserService, EditUserService }