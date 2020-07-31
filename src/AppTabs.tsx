import {
  IonRouterOutlet, IonPage
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import EntryPage from './pages/EntryPage';
import { useAuth } from './auth'
import AddEntryPage from './pages/AddEntryPage';
import EditPage from './pages/EditPage';
import { CurrencyProvider } from './CurrencyContext';

const AppTabs: React.FC = () => {
  const { loggedIn, welcome } = useAuth();
  if (welcome) return <Redirect to="/welcome" />
  if (!loggedIn) return <Redirect to="/login" />
  return (

    <CurrencyProvider>
      <IonPage>
        <IonRouterOutlet>
          <Route exact path="/my/entries">
            <HomePage />
          </Route>
          <Route exact path="/my/entries/add">
            <AddEntryPage />
          </Route>
          <Route exact path="/my/entries/view/:id">
            <EntryPage />
          </Route>
          <Route exact path="/my/entries/view/:id/edit">
            <EditPage />
          </Route>
          <Route exact path="/my/settings">
            <SettingsPage />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    </CurrencyProvider>
  );
};

export default AppTabs;
