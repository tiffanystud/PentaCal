import { apiRequest } from "../../services/api.js";
import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { NotificationCard } from "./components/notification-card.js";
import { RegularButton } from "../../../components/regularButton/regularButton.js";

customElements.define("notification-card", NotificationCard);
customElements.define("regular-button", RegularButton);

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

        PubSub.subscribe("Network:Error", () => {
            this.errorMsg("network");
        });
    }

    async errorMsg(type, resp) {
        let reso = await resp.json();
        if (type === "network") {
            this.root.innerHTML = `
            <p>Network error, server unreachable</p>
            `
        } else {
            this.root.innerHTML = `
            <p>Status: ${resp.status}<br>${reso.error}</p>
            `
        }
    }

    async render() {
        //Hämtar "notifikationerna" när render körs. Vet inte om detta är rätt tänkt, men det funkar.
        //Annars blev effekten oftast att state inte hunnit uppdaterats när redner kördes, så
        //store.getState().notis var bara en tom array [] (loopen kördes inte).
        try {
            let notifications = await apiRequest({
                entity: "events",
                method: "GET"
            });

            notifications = notifications.sort((a, b) => a.time.localeCompare(b.time));
            notifications = notifications.sort((a, b) => new Date(a.date) - new Date(b.date));

            store.setState({notis: notifications});

            this.root.innerHTML = `<h1 style="font-family: Helvetica;">Notifications</h1>
            <div style="display: flex; gap: 10px;">
            <regular-button id="mark-read">Mark all as read</regular-button>
            <regular-button id='delete-all'>Delete all notifications</regular-button>
            </div>`;
            console.log(store.getState().notis);
            for (let noti of store.getState().notis) {
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
        } catch (e) {
            this.errorMsg("other", e.response);
        } 
    }

    subscribeToStore() {
        store.subscribe("notificationsUpdated", (state) => {
            //Do something
        });
    }
}

new CreateNotificationsView(document.querySelector("#app"));