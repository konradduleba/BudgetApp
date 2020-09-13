import React from 'react';

export const addNews = news =>
    news.map(({ photo, title, description }) =>
        <div className='news' key={title}>
            <img src={photo} alt={title} />
            <div className='content'>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>)