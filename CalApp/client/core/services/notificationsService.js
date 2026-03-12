import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

export async function initNotificationsService() {
    PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.GET, async (payload) => {

        try {
            const resource = await apiRequest({
                entity: "events",
                method: "GET",
            });

            // PubSub.publish(EVENTS.RESPONSE.RECEIVED.EVENTS.GET);
            // PubSub.publish(EVENTS.RESOURCE.RECEIVED.EVENTS.GET);
            
            if (!store.getState().data.notis) {
                store.setState({
                    data: {
                        ...store.getState().data,
                        notis: resource
                    }
                });
            } else {
                let newNotis = [...store.getState.data.notis];
                for (let reso of resource) {
                    newNotis.push(reso);
                }
                store.setState({
                    data: {
                        ...store.getState().data,
                        notis: newNotis
                    }
                });
            }
            console.log(store.getState());
            // let currentNotifications = store.getState().data.notis;
            // let newNotis = [...currentNotifications, resource];

            // store.setState({
            //     data: {
            //         ...store.getState().data,
            //         notis: newNotis
            //     }
            // });
            store.notify("notificationsUpdated");
        } catch (e) {
            console.log(e.stack, e.message);
        }
    })

    PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);
}

console.log("Noti service loaded");
console.log(store.getState());