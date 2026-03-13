import { store } from "../store/store.js";
import { pubSub } from "../store/pubsub.js";
import { renderApp } from "../views/renderApp.js"

// Andra förslag på lösning av router? 

function resolveRoute(path) {
    const cleanPath = path.split("?")[0];
    const pathSplit = path.split("/");
    let view; 
    // Dynamisk route: /events/event/3 -> kom på bättre lösning
    if (cleanPath.startsWith("/events/event/")) {
        const id = cleanPath.split("/").pop();
        store.setState({
            currentPage: "eventDetails",
            params: { id }
        });
        store.notify("pageChanged");
        return;
    }
    // Gör lösning ovan så detta fungerar
    
    view = pathSplit[3];
    if (!view){
        view = "home";
    }
    renderApp(view);
    
}

export const Router = {
    
    navigate(path) {
        history.pushState({}, "", path);
        resolveRoute(path);
    },

    init() {
        resolveRoute(window.location.pathname);
        console.log(window.location.pathname);
        

        window.addEventListener("popstate", () => {
            resolveRoute(window.location.pathname);
            console.log("eventListener")
        });
    }
};

