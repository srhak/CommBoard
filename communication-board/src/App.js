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
    { id: 2, categoryName: "Feelings", categoryImg: "https://cdn-icons-png.flaticon.com/512/3269/3269660.png" },
    { id: 3, categoryName: "Actions", categoryImg: "https://rowlandsgillprimary.org/wp-content/uploads/2020/05/activities-clipart-transparent-4.png" }
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    {
      id: 1, options: [
        { optionName: "Yes", optionImg: "https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Ok_check_yes_tick_accept_success_green_correct.png" },
        { optionName: "No", optionImg: "https://t4.ftcdn.net/jpg/05/58/98/43/360_F_558984324_bFquLdaGfaQUxKUyUvsT4G9fgxdAewpM.jpg" },
        { optionName: "Maybe", optionImg: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Lol_question_mark.png" }
      ]
    },
    {
      id: 2, options: [
        { optionName: "Happy", optionImg: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNTg2YmF0Y2gyLWVtb2ppLTAwNi5wbmc.png" },
        { optionName: "Sad", optionImg: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNTg2YmF0Y2gyLWVtb2ppLTAwM18xLmpwZw.jpg" },
        { optionName: "Angry", optionImg: "https://i.pinimg.com/originals/85/6c/72/856c72c52a0be9efbc5315927e1fff85.png" },
        { optionName: "Neutral", optionImg: "https://em-content.zobj.net/source/twitter/348/neutral-face_1f610.png" }
      ]
    },
    {
      id: 3, options: [
        { optionName: "Eat", optionImg: "https://static.thenounproject.com/png/882200-200.png" },
        { optionName: "Restroom", optionImg: "https://icon2.cleanpng.com/20180214/xaw/kisspng-toilet-bathroom-ico-icon-restroom-vector-cliparts-5a84e6e0c55496.2231485115186592968083.jpg" }
      ]
    }
  ]);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentOptions, setCurrentOptions] = useState([]);
  const [openOptions, setOpenOptions] = React.useState(false);
  const [openAddCategory, setOpenAddCategory] = React.useState(false);
  const [openAddOption, setOpenAddOption] = React.useState(false);
  const [categoryCardSize, setCategoryCardSize] = useState(6);
  const [optionCardSize, setOptionCardSize] = useState(6);
  const newCategoryName = useRef('');
  const newCategoryImage = useRef('');
  const newOptionName = useRef('');
  const newOptionImage = useRef('');

  const handleClickOpenOptions = (categoryId) => {
    const selectedCategory = categoryOptions.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      let cardSize = 6;
      if (selectedCategory.options.length + 1 > 4) {
        cardSize = 4;
      }
      setOptionCardSize(cardSize);
      setCurrentCategory(selectedCategory);
      setCurrentOptions(selectedCategory.options);
      setOpenOptions(true);
    }
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const handleClickOpenAddCategory = () => {
    setOpenAddCategory(true);
  };

  const handleCloseAddCategory = () => {
    setOpenAddCategory(false);
  };

  const handleAddCategory = () => {
    let newCategory = {
      id: categories.length + 2,
      categoryName: newCategoryName.current.value,
      categoryImg: newCategoryImage.current.value
    }
    let cardSize = 6;
    if (categories.length + 2 > 4) {
      cardSize = 4;
    }
    setCategories([...categories, newCategory]);
    setCategoryCardSize(cardSize);
    console.log("added category: ", newCategory);
    handleCloseAddCategory();
  };

  const handleClickOpenAddOption = () => {
    setOpenAddOption(true);
  };

  const handleCloseAddOption = () => {
    setOpenAddOption(false);
  };

  const handleAddOption= () => {
    let newOption = {
      optionName: newOptionName.current.value,
      optionImg: newOptionImage.current.value
    }
    let cardSize = 6;
    if (currentCategory.options.length + 2 > 4) {
      cardSize = 4;
    }
    setCategoryOptions(prevOptions => {
      return prevOptions.map(category => {
        if (category.id === currentCategory.id) {
          return {
            ...category,
            options: [...category.options, newOption]
          };
        }
        return category;
      });
    });
    setOptionCardSize(cardSize);
    console.log("card size: ", optionCardSize);
    setCurrentOptions(prevOptions => [...prevOptions, newOption]);
    console.log("added option: ", newOption);
    console.log("card size: ", optionCardSize);
    handleCloseAddOption();
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
        <Grid style={{ height: "50%" }} item xs={categoryCardSize}>
          <CategoryCard name="Add Category" imgUrl="https://cdn.icon-icons.com/icons2/834/PNG/512/plus_icon-icons.com_66718.png" openDialog={handleClickOpenAddCategory}/>
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
            <CategoryCard className="option-card" name="Add Option" imgUrl="https://cdn.icon-icons.com/icons2/834/PNG/512/plus_icon-icons.com_66718.png" openDialog={handleClickOpenAddOption}/>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        open={openAddCategory}
        onClose={handleCloseAddCategory}
        sx={{
          '& .MuiPaper-root': {
              width: "400px",
              height: "300px",
          },
      }}
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

      <Dialog
        open={openAddOption}
        onClose={handleCloseAddOption}
        sx={{
          '& .MuiPaper-root': {
              width: "400px",
              height: "300px",
          },
      }}
      >
        <DialogTitle>Add Option</DialogTitle>
        <DialogContent id="dialog-content">
            <TextField
                id="option-name"
                label="Option Name"
                inputRef={newOptionName}
            />
            <TextField
                id="category-image"
                label="Option Image URL"
                inputRef={newOptionImage}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseAddOption}>Cancel</Button>
            <Button onClick={handleAddOption}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
