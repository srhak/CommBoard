import React, { useState, useEffect, useRef } from 'react';
import './CategoryCard.css';

function CategoryCard(props) {
    const { name, imgUrl, openDialog } = props;
    return (
        <div className='container'>
            <button onClick={openDialog} className="category-card">
                <div id="image-container">
                    <img id="image" src={imgUrl}></img>
                </div>
                {name}
            </button>
        </div>
    );
}

export default CategoryCard;
