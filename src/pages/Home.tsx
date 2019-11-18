import {
  withIonLifeCycle,
  IonButtons,
  IonThumbnail,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";
import "./Home.css";

import api from "../services/api";

type HomeState = {
  champions: any;
  championList: any;
};

class HomePage extends React.Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = { champions: [], championList: [] };
  }

  async getData() {
    return await api.get("/data/en_US/champion.json");
  }

  async ionViewWillEnter() {
    this.setState({ champions: await this.getData() });
    console.log(this.state.champions);

    this.setState({
      championList: await Object.keys(this.state.champions.data.data).map(
        (championName: any) => {
          const champion = this.state.champions.data.data[championName];
          const baseURL =
            this.state.champions.config.baseURL + "/img/champion/";
          console.log(baseURL);

          return (
            <IonItem key={champion.id}>
              <IonThumbnail slot="start">
                <img src={baseURL + champion.image.full} alt="" />
              </IonThumbnail>
              <IonLabel>
                <h2>{champion.name}</h2>
                <p>{champion.tags.join("/")}</p>
              </IonLabel>
            </IonItem>
          );
        }
      )
    });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Champions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>{this.state.championList}</IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(HomePage);
