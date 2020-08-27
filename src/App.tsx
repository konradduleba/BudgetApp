import {
  IonApp, IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth'
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import NotFoundPage from './pages/NotFoundPage';
import './app.css';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import { CurrencyListProvider } from './CurrencyContext';

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();

  if (loading) return <IonLoading isOpen />

  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <CurrencyListProvider>
          <IonReactRouter>
            <Switch>
              <Route exact path="/welcome">
                <WelcomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Redirect exact path="/" to="/my/entries" />
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </IonReactRouter>
        </CurrencyListProvider>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
