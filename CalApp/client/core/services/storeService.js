import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

console.log("Store service loaded");

export class StoreService {

    constructor() {

        PubSub.subscribe(EVENTS.STATE.LOGIN.START, async (userId) => {

            try {
                // Get user
                const currUser = await apiRequest({
                    entity: `users?id=${userId}`,
                    method: "GET"
                });

                // UPDATE STATE (user)
                store.setState({
                    isLoggedIn: {
                        id: currUser.id,
                        username: currUser.name,
                        email: currUser.email
                    }
                });

                // Get User Groups (UG)
                const usergroups = await apiRequest({
                    entity: `users_calendars?userId=${userId}`,
                    method: "GET"
                });

                // Get Friends
                const friends = await apiRequest({
                    entity: `friendships?userId=${userId}`,
                    method: "GET"
                });

                // Get Private MSG
                const privateMessages = await apiRequest({
                    entity: `private_msg?userId=${userId}`,
                    method: "GET"
                });

                // Get Calendar MSG
                const calendarMessages = [];
                for (let ug of usergroups) {
                    const msgs = await apiRequest({
                        entity: `calendar_msg?senderId=${userId}&calId=${ug.calId}`,
                        method: "GET"
                    });

                    for (let msg of msgs) {
                        calendarMessages.push(msg);
                    }
                }

                // Get Pinned cals
                const pinned = await apiRequest({
                    entity: `users_pinned_calenders?userId=${userId}`,
                    method: "GET"
                });

                // Get Avails
                const availabilities = await apiRequest({
                    entity: `users_availabilities?userId=${userId}`,
                    method: "GET"
                });

                // Get Calendars (based on UG)
                const calIds = [];
                for (let ug of usergroups) {
                    calIds.push(ug.calId);
                }

                const cals = [];
                for (let calId of calIds) {
                    const cal = await apiRequest({
                        entity: `calendars?id=${calId}`,
                        method: "GET"
                    });
                    cals.push(cal);
                }

                // Get Events (based on cals)
                let events = [];
                for (let calId of calIds) {

                    const eventsForCal = await apiRequest({
                        entity: `events?calId=${calId}`,
                        method: "GET"
                    });

                    for (let event of eventsForCal) {
                        events.push(event);
                    }
                }

                // UPDATE STATE (all data)
                store.setState({
                    usergroups: usergroups,
                    cals: cals,
                    events: events,
                    friends: friends,
                    privateMessages: privateMessages,
                    calendarMessages: calendarMessages,
                    userPinnedCalendars: pinned,
                    availabilites: availabilities
                });

            } catch (err) {

                console.error("StoreService login error:", err);
                PubSub.publish(EVENTS.STATE.LOGIN.ERROR, err);

            }
        });
    }
}

new StoreService()