import React from 'react';
import { IonRouterLink } from '@ionic/react';
import { menuList } from '../utils/variables';
import { appLogo } from '../utils/variables';

const PageLink = ({ href, title }) =>
    <IonRouterLink href={href}>
        <li className="menu_element">{title}</li>
    </IonRouterLink>

const getMenuWithoutOwner = ownerHref => menuList.filter(({ href }) => href !== ownerHref)

export const RenderMenuPC = owner =>
    <section className="menu_and_logo">
        <img src={appLogo} alt="piggy" />
        <nav className="menu">
            <ul className="menu_list">
                {getMenuWithoutOwner(owner).map(({ href, title }) => <PageLink key={title} href={href} title={title} />)}
            </ul>
        </nav>
    </section>