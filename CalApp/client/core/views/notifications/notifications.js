import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { NotificationCard } from "./components/notification-card.js";

customElements.define("notification-card", NotificationCard);


export class CreateNotificationsView {
    constructor(root, body) {
        this.root = root;
        this.body = body;
    }

    render() {
        this.root.innerHTML = "";
        this.body.innerHTML = "";
        for (let noti of store.getState().data.notis) {
            let notiCard = document.createElement("notification-card");
            notiCard.data = noti;
            this.root.appendChild(notiCard);
        }
    }

    subscribeToStore() {
        store.subscribe("notificationsUpdated", (state) => {
            //Do something
        });
    }
}