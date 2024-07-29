import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, IconButton, Button, TextField, Box, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import CityData from '../dataStore/cityData';
import CityDialog from './cityDialog';

const hebrewToEnglishMap = {
  א: 't', ב: 'c', ג: 'd', ד: 's', ה: 'v', ו: 'u', ז: 'z', ח: 'j', ט: 'y',
  י: 'h', כ: 'f', ל: 'k', מ: 'n', נ: 'b', ס: 'x', ע: 'g', פ: 'p', צ: 'm',
  ק: 'e', ר: 'r', ש: 'a', ת: ',', ך: 'l', ם: 'o', ן: 'i', ף: ';', ץ: '.',
  ' ': ' '
};

const transliterateCustom = (str) => {
  return str.split('').map(char => hebrewToEnglishMap[char] || char).join('');
};

const CitiesList = observer(() => {
  useEffect(() => {
    CityData.initialCities();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ isSorted: false, direction: 'asc' });

  const handleClickOpen = (data = null) => {
    const jsonData = data ? { id: data.id, name: data.name } : null;
    setEditData(jsonData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteCity = async (id) => {
    await CityData.deleteCity(id);
    await CityData.initialCities();
  };

  const handleSort = () => {
    setSortConfig(prevConfig => ({
      isSorted: true,
      direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const rows = CityData.citiesList;

  const filteredRows = rows.filter(row => {
    const transliteratedName = transliterateCustom(row.name).toLowerCase();
    return (
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transliteratedName.includes(searchTerm.toLowerCase())
    );
  });

  const sortedRows = sortConfig.isSorted ? [...filteredRows].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  }) : filteredRows;

  const displayedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField label="Search City" variant="outlined"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={handleSort}
            startIcon={sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}> Sort</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleClickOpen()}>Add</Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleClickOpen(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDeleteCity(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CityDialog open={open} onClose={handleClose} data={editData} />
    </>
  );
});

export default CitiesList;
