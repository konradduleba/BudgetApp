import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { Redirect } from 'react-router';
import { useAuth, handleLogin, loggedWithoutRegister, handleRegister } from '../utils/auth';
import useWindowDimensions from '../utils/windowDimensions';
import LoginPageOnPC from '../components/LoginPageOnPC';
import LoginPageOnMobile from '../components/LoginPageOnMobile';


const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null);
  const [menu, showMenu] = useState(false);
  const { width } = useWindowDimensions();


  const handleLoginUser = async () => setLoginMessage(await handleLogin(email, password));
  const handleRegisterUser = async () => setLoginMessage(await handleRegister(email, password));

  if (loggedIn) return <Redirect to="my/entries" />

  return (
    <IonPage className="login_page">
      {(width < 1024) ?
        <LoginPageOnMobile
          menu={menu}
          showMenu={showMenu}
          handleLoginUser={handleLoginUser}
          loggedWithoutRegister={loggedWithoutRegister}
          setEmail={setEmail}
          setPassword={setPassword}
          loginMessage={loginMessage} />
        :
        <LoginPageOnPC
          handleRegisterUser={handleRegisterUser}
          handleLoginUser={handleLoginUser}
          loggedWithoutRegister={loggedWithoutRegister}
          setEmail={setEmail}
          setPassword={setPassword}
          loginMessage={loginMessage}
        />
      }

    </IonPage>
  );
};

export default LoginPage;
