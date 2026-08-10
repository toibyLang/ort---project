import axios from "axios";

let baseUrl = "/api/members"

export const addMemberToServer = (data) => {
    return axios.post(`${baseUrl}`, data);
}

export const getMemberById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}
export const getAllMembersFromServer = () => {
    return axios.get(`${baseUrl}`);
}
export const updateMemberInServer = (id, data) => {
    return axios.put(`${baseUrl}/${id}`, data)

}
export const deleteMemberFromServer = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}