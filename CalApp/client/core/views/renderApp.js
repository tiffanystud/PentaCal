import { store } from "../store/store.js";
import { renderHome } from "./home/homeViewTest.js";
//import { renderCalendar } from "./calendar/calendarView.js";
//import { renderEvents } from "./events/eventView.js";
import { BottomNav } from "../../components/bottomNav/bottomNav.js";

// Kör som en callback för eventet "pageChanged" i store
export function renderApp(view) {
    switch (view) {
        case "home":
            if(window.location.pathname === "home/my-groups");
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
