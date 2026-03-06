
import { apiRequest } from "./api";
import { Pubsub } from "../store/pubsub";
import { Store } from "../store/store";

Pubsub.subscribe("request:sent:calendars:post", async function (payload) {
    
    try {
        
        //
        const response = await apiRequest({
            entity: "calendars",
            method: "POST",
            body: payload
        });

        
    } catch {
        
        // console.log
        
    }

})