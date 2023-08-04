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
const EditUserService = (inputdata) => {
    return axios.put('/api/edit-user', inputdata);
}
const getAllcodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`)
}
const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}
export {
    handleLogiApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    EditUserService,
    getAllcodeService,
    getDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctor,
    getDetailInforDoctor
}