import React, { useState } from 'react';
import { RenderMenuPC } from '../components/RenderMenuPC';
import SendMessageInputs from '../components/SendMessageInputs';
import myPhoto from '../img/me.jpg';
import { aboutMeDescription } from '../utils/variables';
import useWindowDimensions from '../utils/windowDimensions';
import RenderMenu from '../components/RenderMenuMobile';


const ContactPage = () => {
    const { width } = useWindowDimensions();
    const [menu, showMenu] = useState(false);
    return (
        <div className='all_page_wrapper'>
            {(width < 1024) ?
                <RenderMenu menu={menu} showMenu={showMenu} ownerHref='./contact' />
                :
                <>
                    {RenderMenuPC('./contact')}
                </>
            }
            <section className='container_contact'>
                <div className='contact'>
                    <div className='about_me'>
                        <img src={myPhoto} alt='konrad duleba' />
                        <p>{aboutMeDescription}</p>
                    </div>
                    <div className='form'>
                        <div className='title'>
                            <h1>Skontaktuj się ze mną</h1>
                            <p>Możesz to zrobić tutaj lub z poziomu aplikacji</p>
                        </div>
                        <SendMessageInputs />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage;