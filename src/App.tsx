import { IonApp, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './utils/auth'
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage';
import AppTabs from './pages/AppTabs';
import NotFoundPage from './pages/NotFoundPage';
import './styles/app.scss';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import { CurrencyListProvider } from './utils/CurrencyContext';
import useWindowDimensions from './utils/windowDimensions';

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  const { width } = useWindowDimensions();

  if (loading) return <IonLoading isOpen />

  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <CurrencyListProvider>
          <IonReactRouter basename={process.env.PUBLIC_URL}>
            <Switch>
              {(width < 1024) ?
                <Route exact path="/welcome">
                  <WelcomePage />
                </Route>
                :
                <Route exact path="/welcome">
                  <LoginPage />
                </Route>
              }
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/news">
                <NewsPage />
              </Route>
              <Route exact path="/privacy">
                <PrivacyPage />
              </Route>
              <Route exact path="/contact">
                <ContactPage />
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
