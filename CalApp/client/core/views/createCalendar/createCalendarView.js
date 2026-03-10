// Tiffny

import { PubSub } from "../../store/pubsub.js";
import { Store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";

export class CreateCalendarView {
    
    constructor(root) {
        this.root = root;
    }

    render() {
        
        this.root.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/core/views/createCalendar/createCalendarView.css">
            <h2>Create new calendar</h2>

            <app-input
                label="Calendar name"
                placeholder="Enter name"
                width="100%"
                id="calName"
            ></app-input>
            
            <app-input
                label="Description"
                placeholder="Enter description of the group"
                width="100%"
                height="100px"
                id="calDesc"
            ></app-input>
            
            <toggle-btn
                inactive-header-text="Make calendar public"
                inactive-info-text="If privare only members will be able to see calendar"
                active-header-text="Make calendar public"
                active-info-text="Calendar is now set to public and will be available to all users"
            ></toggle-btn>

        
            <button id="createBtn">Create</button>
        `;
        
        // DOM mst skapas först
        this.addListeners();
    }

    addListeners() {
        
        const createBtn = this.root.querySelector("#createBtn");

        /* 
            {
              "id": "65e10aa11b002",
                "creatorId": "65e10aa11a002",
                "name": "Studiegrupp",
                "type": "private"
            }
        */
        
        createBtn.addEventListener("click", () => {
                        
            const nameInputContainer = this.root.querySelector("#calName").getValue();
            const descInputContainer = this.root.querySelector("#calDesc").getValue();
            
            // Mockdata
            const payload = {
                creatorId: "65e10aa11a062",
                name: "Studiegrupp",
                type: "private"
            }
            
            // Listener?
            
            PubSub.publish(EVENTS.REQUEST.SENT.CALENDARS.POST, payload);
            
            // Pubsub ... payload
            
        });
    }
    
    // Lyssna på förändringar i store
    subscribeToStore() {
        
        Store.subscribe("calendarsUpdated", () => {
            
            // Utveckla store
            console.log("Created Calendar")
        })
    }
    
}









/* 

    Varje view bestämmer vilka events som är relevanta för viewns komponenter. Komponenterna kopplas ej till store själva. 
    store.subscribe("groupsUppdated"), () => {
        this.groupListComponent.update(store.getState().data.groups);
    }
    
    store.subscribe("groupsUppdated"), () => {
        this.groupListComponent.update();
    }
   
    -- 
    
    Komponent: 

    update(groups) {
        this.groups = groups;
        this.render;
    }
*/

/* 



 render() {
        
        this.root.innerHTML = `
            <h2>Create new calendar</h2>

            <app-input
                label="Calendar name"
                placeholder="Enter name"
                width="100%"
                id="calName"
            ></app-input>

            <app-input
                label="Description"
                placeholder="Enter description"
                width="100%"
                id="calDesc"
            ></app-input>

            <button id="createBtn">Create</button>
        `;
        
        // DOM mst skapas först
        this.addListeners();
    }


*/