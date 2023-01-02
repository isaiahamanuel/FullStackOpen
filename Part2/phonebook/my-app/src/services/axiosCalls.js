import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const createBackend = (person) => {
  const request = axios.post(baseUrl, person);
  return request.then((response) => {
    return response.data;
  });
};
const deleteBackend = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response;
};
const exportObject = {
  createBackend,
  deleteBackend,
};
export default exportObject;
