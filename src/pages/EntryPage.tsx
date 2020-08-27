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
import { Entry, toEntry } from '../models';
import { useAuth, handleDeleteDocumentByEntryId, getUserSingleEntryById } from '../auth';
import { formatDate } from '../date';
import { closeOutline as deleteIcon } from 'ionicons/icons';
// import { AiFillDelete as DeleteIcon } from 'react-icons/ai';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { HeaderWithOneFunctionOption } from '../components/Headers'


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
    <IonPage>
      <HeaderWithOneFunctionOption
        title='Podgląd'
        functionIcon={deleteIcon}
        handleFunction={handleDelete}
      />
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


