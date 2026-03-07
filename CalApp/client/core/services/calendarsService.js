
import { apiRequest } from "./api";
import { Pubsub } from "../store/pubsub";
import { Store } from "../store/store";
import { EVENTS } from "../store/events";

// catch event: "request:sent:calendars:post"
Pubsub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.POST, async function (payload) {
    
    try {
        
        // Skicka request data och payload till api.js
        const response = await apiRequest({
            entity: "calendars",
            method: "POST",
            body: payload
        });

        // Publish att response och resource är recieved 
        Pubsub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.POST, response)
        Pubsub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.POST, response)
        
        // Se över store objektet
        const currCals = Store.getState().data.cals;
        const newCals = [...currCals, response];
        
        // Uppdattera state
        Store.setState({
            data: {
                ...Store.getState().data,
                cals: newCals
            }
        });
        
    } catch {
        
        // console.log
        
    }

})