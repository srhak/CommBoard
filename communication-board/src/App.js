import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryCard from './Components/CategoryCard';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
  const [openOptions, setOpenOptions] = React.useState(false);
  const [openAddCategory, setOpenAddCategory] = React.useState(false);
  const [openAddOption, setOpenAddOption] = React.useState(false);
  const [categoryCardSize, setCategoryCardSize] = useState(6);
  const [optionCardSize, setOptionCardSize] = useState();
  const newCategoryName = useRef('');
  const newCategoryImage = useRef('');

  const handleClickOpenOptions = (categoryId) => {
    const selectedCategory = categoryOptions.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      let cardSize = 6;
      if (selectedCategory.options.length + 1 > 4) {
        cardSize = 4;
      }
      setOptionCardSize(cardSize);
      setCurrentOptions(selectedCategory.options);
      setOpenOptions(true);
    }
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const handleClickOpenAddCategory = (categoryId) => {
    setOpenAddCategory(true);
  };

  const handleCloseAddCategory = () => {
    setOpenAddCategory(false);
  };

  const handleAddCategory = () => {
    console.log("add category");
    let newCategory = {
      id: categories.length + 2,
      categoryName: newCategoryName.current.value,
      categoryImg: ""
    }
    setCategories([...categories, newCategory]);
    handleCloseAddCategory();
  };


  return (
    <div className="App">
      <Grid className="categories-container" container spacing={2}>
        {categories.map((category) => (
          <Grid style={{ height: "50%" }} key={category.id} item xs={categoryCardSize}>
            <CategoryCard
              name={category.categoryName}
              imgUrl={category.categoryImg}
              openDialog={() => handleClickOpenOptions(category.id)}
            />
          </Grid>
        ))}
        <Grid item xs={categoryCardSize}>
          <CategoryCard name="Add Category" openDialog={handleClickOpenAddCategory}/>
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={openOptions}
        onClose={handleCloseOptions}
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
            onClick={handleCloseOptions}
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

      <Dialog
        open={openAddCategory}
        onClose={handleCloseAddCategory}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent id="dialog-content">
            <TextField
                id="category-name"
                label="Category Name"
                inputRef={newCategoryName}
            />
            <TextField
                id="category-image"
                label="Category Image URL"
                inputRef={newCategoryImage}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseAddCategory}>Cancel</Button>
            <Button onClick={handleAddCategory}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
