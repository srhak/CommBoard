import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import CategoryCard from './Components/CategoryCard';

function App() {
  const [categories, setCategories] = useState([
    {categoryName: "Responses", categoryImg: ""},
    {categoryName: "Feelings", categoryImg: ""},
    {categoryName: "Actions", categoryImg: ""}
  ]);

  return (
    <div className="App">
      <Grid className="categories-container" container spacing={2}>
        {categories.map((category, index) => (
          <Grid key={index} item xs={6}>
            <CategoryCard name={category.categoryName} img={category.categoryImg}/>
          </Grid>
        ))}
        <Grid item xs={6}>
          <CategoryCard name="Add Category" />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
