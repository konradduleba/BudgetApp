import React, { useState } from 'react';
import { RenderMenuPC } from '../components/RenderMenuPC';
import { otherAppList } from '../utils/variables';
import { renderOtherApps } from '../components/RenderOtherApps';
import useWindowDimensions from '../utils/windowDimensions';
import RenderMenu from '../components/RenderMenuMobile';

const OtherApps = () => {
    const { width } = useWindowDimensions();
    const [menu, showMenu] = useState(false);
    return (
        <div className='all_page_wrapper'>
            {(width < 1024) ?
                <RenderMenu menu={menu} showMenu={showMenu} ownerHref="./other_apps" />
                :
                <>
                    {RenderMenuPC('./other_apps')}
                </>
            }
            <section className='container_other_apps'>
                {renderOtherApps(otherAppList)}
            </section>
        </div>
    )
}

export default OtherApps