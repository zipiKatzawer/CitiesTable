import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,DialogTitle
} from '@mui/material';
import cityData from '../dataStore/cityData';

const CityDialog = observer(({ open, onClose, data }) => {
  const [cityName, setCityName] = useState('');
  const [dialogTitle, setDialogTitle] = useState('Add');

  useEffect(() => {
    if (data) {
      setCityName(data.name);
      setDialogTitle('Edit');
    } else {
      setCityName('');
      setDialogTitle('Add');
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (dialogTitle === 'Add') {
      await cityData.addCity(formJson);
    } else {
      await cityData.editCity(data.id, formJson);
    }

    await cityData.initialCities();
    setCityName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>
        {dialogTitle} City
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          label="City Name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">{dialogTitle}</Button>
      </DialogActions>
    </Dialog>
  );
});

export default CityDialog;
