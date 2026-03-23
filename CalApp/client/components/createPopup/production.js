import { PubSub } from "../../core/store/pubsub.js";
import { EVENTS } from "../../core/store/events.js";
import "./createPopup.js";
import "../../core/views/createGroup/createGroupView.js";
import "../../core/views/createEvent/createEvent.js";

const inputField = document.querySelector("input");

// Lyssna när user skriver
inputField.addEventListener("input", () => {
    
    const value = inputField.value;

    if (value == 1) {
        PubSub.publish(EVENTS.VIEW.POPUP.SHOW.CREATEPOPUP);
    }

    if (value == 2) {
        PubSub.publish(EVENTS.VIEW.POPUP.CLOSE.CREATEPOPUP);
    }
});