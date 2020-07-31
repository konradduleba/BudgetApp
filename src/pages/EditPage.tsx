import React, { useState, useEffect } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonDatetime
} from '@ionic/react';
import { firestore } from '../firebase';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';
import { chevronBackOutline as backIcon } from 'ionicons/icons';
import { useParams } from 'react-router';

interface RouteParams {
  id: string;
}


const EditPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');


  const { id } = useParams<RouteParams>();

  const handleSave = async () => {
    if (amount !== '' && date !== '' && description !== '' && (income || expense)) {
      const entryRef = firestore.collection('users').doc(userId)
        .collection('entries').doc(id);
      await entryRef.update({
        description,
        amount,
        income,
        expense,
        date
      });

      history.goBack();
    }
  }

  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    entryRef.get().then(doc => {
      setAmount(doc.data().amount);
      setDescription(doc.data().description);
      setDate(doc.data().date);
      setIncome(doc.data().income);
      setExpense(doc.data().expense);
    });
  }, [userId, id]);

  const handleIncome = () => {
    setIncome(!income);
    setExpense(false)
  }

  const handleExpense = () => {
    setExpense(!expense);
    setIncome(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="home-page_title">Edytuj dane</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options_settings_place'>
          <IonBackButton icon={backIcon} className="home-page_icon" />
        </IonButtons>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="add-entry_list">
          <IonItem lines="none">
            <IonDatetime value={date} className="add-entry_input" placeholder="Kiedy to było?"
              onIonChange={event => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonInput value={amount} type="number" placeholder="Wpisz kwotę" required={true} className="add-entry_input"
              onIonChange={event => setAmount(event.detail.value)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonTextarea value={description} required={true} className="add-entry_input" placeholder="Opis"
              onIonChange={event => setDescription(event.detail.value)} />
          </IonItem>
          <IonItem lines="none" className="add-entry_last_entry">
            <IonButton onClick={handleIncome} className={`add-entry_button ${income}`}>Przychód</IonButton>
            <p className="add-entry_income_or_expense">Czy</p>
            <IonButton onClick={handleExpense} className={`add-entry_button expense ${expense}`}>Wydatek</IonButton>
          </IonItem>
          <IonButton onClick={handleSave} className="add-entry_button_last">Zapisz</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EditPage;
