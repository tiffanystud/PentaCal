// Tiffny


export class CreateCalendarView {
    constructor(root) {
        this.root = root;
    }

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

        this.addListeners();
    }

    addListeners() {
        const btn = this.root.querySelector("#createBtn");

        btn.addEventListener("click", () => {
            const name = this.root.querySelector("#calName").getValue();
            const desc = this.root.querySelector("#calDesc").getValue();

            console.log("Name:", name);
            console.log("Desc:", desc);

            // Här kommer pubsub senare
        });
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