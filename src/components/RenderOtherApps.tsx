import React from 'react';

export const renderOtherApps = appList => (
    <>
        {appList.map(({ title, href, description }) =>
            <div key={title} className='app_container'>
                <h1>{title}</h1>
                <p>{description}</p>
                <a href={href}>Wypróbuj</a>
            </div>
        )}
    </>
)