import axios from "axios";




const serverApi = process.env.REACT_APP_SERVER_URL;

const apiServer = axios.create({
    baseURL: serverApi,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getVacancies = async () => {
    const res = await apiServer.get('/vacancy');
    return res.data;
}

export const createVacancy = async (vacancy) => {
    const res = await apiServer.post('/vacancy/create', vacancy);
    return res.data;
}

export const updateVacancy = async (id, vacancy) => {
    const res = await apiServer.patch(`/vacancy/update-vacancy/${id}`, vacancy);
    return res.data;
}

export const deleteVacancy = async (id) => {
    await apiServer.delete(`/vacancy/delete-vacancy/${id}`);
}