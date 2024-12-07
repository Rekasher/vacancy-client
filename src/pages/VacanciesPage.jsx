import VacancyTable from "../components/Table/Table";
import "./VacanciesPage.css"
import {useEffect, useState} from "react";
import {createVacancy, deleteVacancy, getVacancies, updateVacancy} from "../api/vacancyAPI";
import CreateVacancyModal from "../components/AddVacancyButton/AddVacancy";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const VacanciesPage = () => {

    const [vacanciesInfo, setVacanciesInfo] = useState([]);
    const [editedVacancy, setEditedVacancy] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getVacanciesInfo = async () => {
            try {
                const data = await getVacancies();

                setVacanciesInfo(data);
            } catch (err) {
                console.error("Error with loading Vacancies: ", err);
            }
        }

        getVacanciesInfo();
    }, []);

    const handleCreateVacancy = async (vacancy) => {
        try {
            const newVacancy = await createVacancy(vacancy);

            setVacanciesInfo((prevVacancies) => [...prevVacancies, newVacancy]);
        } catch (err) {
            console.error("Error with create vacancy: ", err);
        }
    }

    const handleUpdateVacancy = async (id, vacancy) => {
        try {
            const updateVacancyItem = await updateVacancy(id, vacancy);

            setVacanciesInfo((prevVacancies) =>
                prevVacancies.map((prevVacancy) => (prevVacancy._id === id ? { ...prevVacancy, ...updateVacancyItem } : prevVacancy))
            );

        } catch (err) {
            console.error("Error with update vacancy: ", err);
        }
    }

    const openModal = (vInfo = {}) => {
        Object.keys(vInfo).length === 0 ? setIsUpdate(false) : setIsUpdate(true);
        setEditedVacancy(vInfo);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setEditedVacancy({});
    }



    const handleDeleteVacancy = async (id) => {
        try {
            await deleteVacancy(id);

            setVacanciesInfo(vacanciesInfo.filter(vacancy => vacancy._id !== id));
        } catch (err) {
            console.error("Error with delete vacancy: ", err);
        }
    }

    return (
        <div className='page-container'>
            <h1 className='header-vacancies'>Vacancies</h1>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '20px 0 15px 0'}}>
                <Button onClick={() => {
                    setEditedVacancy({})
                    openModal();
                }} size="small" variant="outlined" color="black">+</Button>
            </Box>
            <CreateVacancyModal
                editedVacancy={editedVacancy}
                isUpdate={isUpdate}
                isOpen={isModalOpen}
                onClose={closeModal}
                createVacancy={handleCreateVacancy}
                updateVacancy={handleUpdateVacancy}

            />
            <VacancyTable
                openEditModal={openModal}
                vacanciesInfo={vacanciesInfo}
                handleDeleteVacancy={handleDeleteVacancy}
            />
        </div>
    );
};

export default VacanciesPage;