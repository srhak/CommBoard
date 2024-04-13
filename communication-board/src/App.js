import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import CategoryCard from './Components/CategoryCard';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import OptionCard from './Components/OptionCard';
import './Components/OptionCard.css';

function App() {
  const [categories, setCategories] = useState([
    { id: 1, categoryName: "Responses", categoryImg: "https://t3.ftcdn.net/jpg/04/98/54/90/360_F_498549008_hnjyK9dXffqOph3C4H6lHrSz3sP1BWhV.jpg" },
    { id: 2, categoryName: "Feelings", categoryImg: "" },
    { id: 3, categoryName: "Actions", categoryImg: "" }
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    {
      id: 1, options: [
        { optionName: "Yes", optionImg: "https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Ok_check_yes_tick_accept_success_green_correct.png" },
        { optionName: "No", optionImg: "" },
        { optionName: "Maybe", optionImg: "" }
      ]
    },
    {
      id: 2, options: [
        { optionName: "Happy", optionImg: "" },
        { optionName: "Sad", optionImg: "" },
        { optionName: "Angry", optionImg: "" },
        { optionName: "Neutral", optionImg: "" }
      ]
    },
    {
      id: 3, options: [
        { optionName: "Eat", optionImg: "" },
        { optionName: "Restroom", optionImg: "" }
      ]
    }
  ]);

  const [currentOptions, setCurrentOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [categoryCardSize, setCategoryCardSize] = useState();
  const [optionCardSize, setOptionCardSize] = useState();

  const handleClickOpen = (categoryId) => {
    const selectedCategory = categoryOptions.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      let cardSize = 6;
      if (selectedCategory.options.length + 1 > 4) {
        cardSize = 4;
      }
      setOptionCardSize(cardSize);
      setCurrentOptions(selectedCategory.options);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Grid className="categories-container" container spacing={2}>
        {categories.map((category) => (
          <Grid style={{ height: "50%" }} key={category.id} item xs={6}>
            <CategoryCard
              name={category.categoryName}
              imgUrl={category.categoryImg}
              openDialog={() => handleClickOpen(category.id)}
            />
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
        className="dialog"
        sx={{
          '& .MuiDialog-paper': {
              backgroundColor: 'var(--blue)',
          },
      }}
      >
        <div className="dialog-toolbar">
          <IconButton
            edge="start"
            onClick={handleClose}
            aria-label="close"
            id="close-button"
          >
            <CloseIcon sx={{color: "whitesmoke"}} fontSize="large" />
          </IconButton>
        </div>
        <Grid className="options-container" container spacing={2}>
          {currentOptions.map((option, index) => (
            <Grid key={index} style={{ height: "50%" }} item xs={optionCardSize}>
              <OptionCard name={option.optionName} imgUrl={option.optionImg} />
            </Grid>
          ))}
          <Grid style={{ height: "50%" }} item xs={optionCardSize}>
            <button className="option-card" id="add-option-button"> Add Option </button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default App;
