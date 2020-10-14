import React, { useState } from 'react';
import { RenderMenuPC } from '../components/RenderMenuPC';
import SendMessageInputs from '../components/SendMessageInputs';
import useWindowDimensions from '../utils/windowDimensions';
import RenderMenu from '../components/RenderMenuMobile';


const ContactPage = () => {
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
            <section className='container_contact'>
                <div className='contact'>
                    <div className='form'>
                        <div className='title'>
                            <h1>Skontaktuj się z nami</h1>
                            <p>Możesz to zrobić przez formularz lub z poziomu aplikacji</p>
                        </div>
                        <SendMessageInputs />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage;