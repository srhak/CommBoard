import React, { useState, useEffect, useRef } from 'react';
import './OptionCard.css';

function OptionCard(props) {
    const { name, img } = props;
    return (
        <div className='option-card'>
            {name}
        </div>
    );
}

export default OptionCard;
