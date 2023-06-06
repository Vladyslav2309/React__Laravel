import React from 'react';
import './loadingStyle.scss';
const Loading = () => {
    return (
        <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
        </div>
    );
};

export default Loading;