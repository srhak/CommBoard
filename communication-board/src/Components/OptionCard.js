import React, { useState, useEffect, useRef } from 'react';
import './OptionCard.css';

function OptionCard(props) {
    const { name, imgUrl } = props;
    return (
        <div className='option-card'>
            <div id="image-container">
                <img id="image" src={imgUrl}></img>
            </div>
            {name}
        </div>
    );
}

export default OptionCard;
