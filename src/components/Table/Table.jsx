import * as React from 'react';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {TableContainer, TableHead, TableRow, Paper, Button, TableBody, Table} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 3,
    },
}));

export default function VacancyTable({
                                         vacanciesInfo,
                                         handleDeleteVacancy,
                                         openEditModal,
                                     }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Company</StyledTableCell>
                        <StyledTableCell align="center">Vacancy</StyledTableCell>
                        <StyledTableCell align="center">Salary</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Note</StyledTableCell>
                        <StyledTableCell align="right">Change</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vacanciesInfo.map((vacancyInfo) => (
                        <StyledTableRow key={vacancyInfo._id}>
                            <StyledTableCell align="left">{vacancyInfo.company}</StyledTableCell>
                            <StyledTableCell align="center">{vacancyInfo.vacancy}</StyledTableCell>
                            <StyledTableCell
                                align="center">{`${vacancyInfo.minSalaryFork} - ${vacancyInfo.maxSalaryFork}`}</StyledTableCell>
                            <StyledTableCell align="center">{vacancyInfo.status}</StyledTableCell>
                            <StyledTableCell align="center">{vacancyInfo.note}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    onClick={() => openEditModal(vacancyInfo)}
                                    size="small" variant="outlined" color="black">
                                    <EditIcon/>
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    onClick={() => {
                                        handleDeleteVacancy(vacancyInfo._id)
                                    }}
                                    size="small" variant="outlined" color="black">
                                    <DeleteForeverIcon/>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
