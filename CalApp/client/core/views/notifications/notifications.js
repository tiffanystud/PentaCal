import { apiRequest } from "../../services/api.js";
import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { NotificationCard } from "./components/notification-card.js";

customElements.define("notification-card", NotificationCard);

export class CreateNotificationsView {
    constructor(root) {
        this.root = root;
        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath === "notifications") {
                //Testade att koppla samman notify och publish men fungerade inte när man 
                //skrev /notifications direkt in i URL:en och render() metoden kördes 6 gånger
                //för någon anledning

                // store.subscribe("notis", () => {
                //     this.render();
                // });
                // PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);

                this.render();
            }
        });
    }

    async render() {
        //Hämtar "notifikationerna" när render körs. Vet inte om detta är rätt tänkt, men det funkar.
        //Annars blev effekten oftast att state inte hunnit uppdaterats när redner kördes, så
        //store.getState().notis var bara en tom array [] (loopen kördes inte).
        let notifications = await apiRequest({
            entity: "events",
            method: "GET"
        });

        store.setState({userData: { notis: notifications }});

        this.root.innerHTML = "<h1>Notifications</h1> <button id='mark-read'>Mark all as read</button><button id='delete-all'>Delete all notifications</button>";
        console.log(store.getState());
        console.log(store.getState().userData.notis);
        for (let noti of store.getState().userData.notis) {
            let notiCard = document.createElement("notification-card");
            notiCard.data = noti;
            this.root.appendChild(notiCard);
        }

        document.querySelector("#mark-read").addEventListener("click", () => {
            console.log("//Skicka request att markera alla som lästa");
        });

        document.querySelector("#delete-all").addEventListener("click", () => {
            //Skicka request att ta bort alla notifikationer. Om request går bra gör:
            let notis = document.querySelectorAll("notification-card");
            notis.forEach((x) => {
                this.root.removeChild(x);
            });
            this.root.innerHTML += "<p>No notifications to view!</p>";
        });
    }

    subscribeToStore() {
        store.subscribe("notificationsUpdated", (state) => {
            //Do something
        });
    }
}

new CreateNotificationsView(document.querySelector("#app"));