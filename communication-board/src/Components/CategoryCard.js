import React, { useState, useEffect, useRef } from 'react';

function CategoryCard(props) {
    const { name, img } = props;
    return (
        <div>
            <button>{name}</button>
        </div>
    );
}

export default CategoryCard;
