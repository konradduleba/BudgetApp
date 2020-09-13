import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonFabButton,
  IonList,
  IonLabel,
  IonItem,
  IonText,
  IonFab
} from '@ionic/react';
import { useParams, useHistory } from 'react-router';
import { Entry, toEntry } from '../utils/models';
import { useAuth, handleDeleteDocumentByEntryId, getUserSingleEntryById } from '../utils/auth';
import { formatDate } from '../utils/date';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { HeaderWithOneFunctionOption } from '../components/Headers';


interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const handleData = async () => {
      const entryRef = getUserSingleEntryById(userId, id);
      entryRef.get().then(doc => setEntry(toEntry(doc)));
      entryRef.onSnapshot(() => entryRef.get().then(doc => setEntry(toEntry(doc))));
    }
    handleData();
  }, [userId, id]);

  const handleDelete = async () => {
    history.goBack();
    await handleDeleteDocumentByEntryId(userId, id);
  }

  return (
    <IonPage className='entry_page'>
      <HeaderWithOneFunctionOption
        title='Podgląd'
        handleFunction={handleDelete}
        moveBackFunction={history.goBack}
      />
      <IonContent>
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
            <IonContent>
              <p>{entry?.description}</p>
            </IonContent>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed" className="circle_position">
        <IonFabButton routerLink={`/my/entries/view/${id}/edit`}>
          <EditIcon className="circle" />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default EntryPage;


