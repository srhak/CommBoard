import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import CategoryCard from './Components/CategoryCard';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function App() {
  const [categories, setCategories] = useState([
    {id: 1, categoryName: "Responses", categoryImg: ""},
    {id: 2, categoryName: "Feelings", categoryImg: ""},
    {id: 3, categoryName: "Actions", categoryImg: ""}
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Grid className="categories-container" container spacing={2}>
        {categories.map((category) => (
          <Grid key={category.id} item xs={6}>
            <CategoryCard name={category.categoryName} img={category.categoryImg} openDialog={handleClickOpen}/>
          </Grid>
        ))}
        <Grid item xs={6}>
          <CategoryCard name="Add Category" />
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
