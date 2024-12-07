import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './AddVacancy.css'
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {useEffect} from "react";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const CreateVacancyModal = ({isOpen, isUpdate, onClose, createVacancy, updateVacancy, editedVacancy}) => {

    const [modalVacancy, setModalVacancy] = React.useState({});

    useEffect(() => {
        if (isUpdate) {
            setModalVacancy(editedVacancy || {});
        } else {
            setModalVacancy({});
        }
    }, [isUpdate, editedVacancy]);

    const handleSave = () => {
        if (isUpdate) {
            updateVacancy(modalVacancy._id, modalVacancy);
            return
        }
        createVacancy(JSON.stringify(modalVacancy));
    }



    const onTextEdit = (e) => {
        const {value, name} = e.target;

        if (/^[a-zA-Zа-яА-Я0-9\s]*$/.test(value) && value.length < 100) {
            setModalVacancy({
                ...modalVacancy,
                [name]: value,
            });
        }
    }

    const onSalaryChange = (e) => {
        const {value, name} = e.target;

        if (/^\d*$/.test(value) && value.length < 10) {
            setModalVacancy({
                ...modalVacancy,
                [name]: value,
            });
        }
    };

    const onStatusChange = (e) => {
        const {value} = e.target;
        setModalVacancy({
            ...modalVacancy,
            status: value,
        });
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                onClose();
                setModalVacancy({});
            }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{...style, width: 600}}>
                <h2 className='modal-title'>Add new vacancy</h2>
                <TextField
                    id="filled-multiline-flexible"
                    name="company"
                    label="Company"
                    multiline
                    rows={1}
                    value={modalVacancy.company}
                    onChange={onTextEdit}
                    inputProps={{maxLength: 15}}
                    type="text"
                    fullWidth={true}
                    margin="normal"
                    color="black"

                />
                <TextField
                    id="filled-multiline-static"
                    name="vacancy"
                    label="Vacancy"
                    multiline
                    rows={1}
                    value={modalVacancy.vacancy}
                    onChange={onTextEdit}
                    inputProps={{maxLength: 15}}
                    fullWidth={true}
                    margin="normal"
                    color="black"
                />
                <Stack direction="row" spacing={3}>
                    <TextField
                        id="standard-multiline-flexible"
                        name="minSalaryFork"
                        label="Minimum-salary"
                        multiline
                        rows={1}
                        value={modalVacancy.minSalaryFork}
                        onChange={onSalaryChange}
                        inputProps={{maxLength: 10}}
                        type="number"
                        margin="normal"
                        fullWidth={true}
                        color="black"
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        name="maxSalaryFork"
                        label="Maximum-salary"
                        multiline
                        rows={1}
                        value={modalVacancy.maxSalaryFork}
                        onChange={onSalaryChange}
                        inputProps={{maxLength: 10}}
                        type="number"
                        margin="normal"
                        fullWidth={true}
                        color="black"
                    />
                </Stack>
                <FormControl fullWidth margin="normal" color="black">
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={modalVacancy.status || ""}
                        label="status"
                        onChange={onStatusChange}
                    >
                        <MenuItem name={'Sent'} value={'Sent'}>Sent</MenuItem>
                        <MenuItem name={'Pending'} value={'Pending'}>Pending</MenuItem>
                        <MenuItem name={'Offer'} value={'Offer'}>Offer</MenuItem>
                        <MenuItem name={'Declined'} value={'Declined'}>Declined</MenuItem>
                        <MenuItem name={'Closed'} value={'Closed'}>Closed</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="standard-multiline-flexible"
                    name="note"
                    label="Note"
                    multiline
                    rows={4}
                    onChange={onTextEdit}
                    value={modalVacancy.note}
                    type="text"
                    fullWidth={true}
                    margin="normal"
                    color="black"
                />
                <Stack direction="row" spacing={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => {
                        onClose();
                        setModalVacancy({});
                    }}
                            variant="outlined" color="black">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleSave();
                        setModalVacancy({});
                        onClose();
                    }} variant="contained" color="black">
                        {isUpdate ? "Update" : "Create"}
                    </Button>
                </Stack>

            </Box>
        </Modal>


    );
};

export default CreateVacancyModal;
