// Tiffny


export class CreateCalendarView {
    
    constructor(root) {
        this.root = root;
    }
    
    render() {
        // HTML
    }
    
    addListeners() {
        // Eventlisteners och senare pubsub
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