import React, { useState, useEffect, useRef } from 'react';
import './CategoryCard.css';

function CategoryCard(props) {
    const { name, img, openDialog } = props;
    return (
        <div className='container'>
            <button onClick={openDialog} className="category-card">{name}</button>
        </div>
    );
}

export default CategoryCard;
