import React, { useState, useEffect } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonFabButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonLabel,
  IonItem,
  IonText,
  IonFab
} from '@ionic/react';
import { useParams, useHistory } from 'react-router';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { useAuth } from '../auth';
import { formatDate } from '../date';
import { chevronBackOutline as backIcon } from 'ionicons/icons';
import { AiFillDelete as DeleteIcon } from 'react-icons/ai';
import { FaEdit as EditIcon } from 'react-icons/fa';


interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id)
    entryRef.get().then(doc => setEntry(toEntry(doc)));
    entryRef.onSnapshot(() => entryRef.get().then(doc => setEntry(toEntry(doc))));
  }, [userId, id]);

  const handleDelete = async () => {
    history.goBack();
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    await entryRef.delete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="home-page_title">Podgląd</IonTitle>
        </IonToolbar>
        <IonButtons className='home-page_options_left'>
          <IonButton expand="block" fill="clear" onClick={() => history.goBack()}>
            <IonIcon icon={backIcon} className="home-page_icon" />
          </IonButton>
        </IonButtons>
        <IonButtons className='home-page_options' onClick={handleDelete}>
          <DeleteIcon className="home-page_icon" />
        </IonButtons>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines="none">
            <IonLabel>Data</IonLabel>
            <IonText>
              <p>{formatDate(entry?.date)}</p>
            </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Kwota</IonLabel>
            <IonText>
              <p>{entry?.amount}</p>
            </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Opis</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonContent className="entry-page_description">
              <p>{entry?.description}</p>
            </IonContent>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed" className="entry-page_circle_position">
        <IonFabButton routerLink={`/my/entries/view/${id}/edit`}>
          <EditIcon className="entry-page_circle" />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default EntryPage;


