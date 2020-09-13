import React, { useState } from 'react';
import { RenderMenuPC } from '../components/RenderMenuPC';
import { privacyData } from '../utils/variables';
import useWindowDimensions from '../utils/windowDimensions';
import RenderMenu from '../components/RenderMenuMobile';

const renderPrivacy = data => (
    <>
        {data.map(({ title, description }) =>
            <div className='privacy_container' key={title}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        )}
    </>
)

const OtherApps = () => {
    const { width } = useWindowDimensions();
    const [menu, showMenu] = useState(false);
    return (
        <div className='all_page_wrapper'>
            {(width < 1024) ?
                <RenderMenu menu={menu} showMenu={showMenu} ownerHref="./privacy" />
                :
                <>
                    {RenderMenuPC('./privacy')}
                </>
            }
            <section className='container_privacy'>
                {renderPrivacy(privacyData)}
            </section>
        </div>
    )
}

export default OtherApps