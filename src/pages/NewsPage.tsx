import React, { useState } from 'react';
import { RenderMenuPC } from '../components/RenderMenuPC';
import { newsList } from '../utils/variables';
import { addNews } from '../components/AddNews';
import useWindowDimensions from '../utils/windowDimensions';
import RenderMenu from '../components/RenderMenuMobile';


const NewsPage = () => {
    const { width } = useWindowDimensions();
    const [menu, showMenu] = useState(false);

    return (

        <div className='all_page_wrapper'>
            {(width < 1024) ?
                <RenderMenu menu={menu} showMenu={showMenu} />
                :
                <>
                    {RenderMenuPC()}
                </>
            }
            <section className='container_news'>
                {addNews(newsList)}
            </section>
        </div>
    )
}

export default NewsPage