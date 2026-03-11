import { store } from "../store/store.js";
import { renderHome } from "./home/homeView.js";
import { renderCalendar } from "./calendar/calendarView.js";
import { renderEvents } from "./events/eventView.js";


// Kör som en callback för eventet "pageChanged" i store
export function renderApp() {
    
    const { currentPage, params } = store.getState();

    switch (currentPage) {
        case "home":
            renderHome();
            break;

        case "calendar":
            renderCalendar();
            break;

        case "events":
            renderEvents(params);
            break;

        default:
            document.querySelector("#app").innerHTML = "<h1>404</h1>";
    }
}
