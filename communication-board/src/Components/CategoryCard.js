import React, { useState, useEffect, useRef } from 'react';
import './CategoryCard.css';

function CategoryCard(props) {
    const { name, img } = props;
    return (
        <div className='container'>
            <button className="category-card">{name}</button>
        </div>
    );
}

export default CategoryCard;
