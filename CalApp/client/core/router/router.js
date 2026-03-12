// export function handleRouter(pathName) {
//     let segments = pathName.split("/").filter(Boolean);

//     if (segments[0] === "client") {
//         segments.splice(0, 1);
//     }
//     console.log(`ROUTER: ${segments}`);


//     if (segments[0] === "home" && segments[1] === "myGroupView") {
//         console.log("myGroupView");
//     } else if (segments[0] === "home" && segments[1] === "myCalView") {
//         console.log("myCalView");
//     } else if (segments[0] === "home") {
//         console.log("home page");
//     } else {
//         console.log("404: Page not found");
//     }
// }


import { CreateNotificationsView } from "../views/notifications/notifications.js";
import { createGroupLandingView } from "../views/groupLanding/groupLanding.js";
import { HomeView } from "../views/home/homeView.js";




const routes = {
    "/CalApp/index.html": () => {
        console.log("/CalApp/index.html page");
    },
    "": () => {
        const app = document.querySelector("#app")
        const view = new HomeView();
        app.replaceChildren(view);
    },
    "groupsView": () => {
        console.log("/groupsView page");
        myGroupView();
    },
    "createNewCalendar": () => {
        const view = new CreateCalendarView(document.querySelector("#app"));
        view.render();
    },
    "notifications": () => {
        const view = new CreateNotificationsView(document.querySelector("#app"), document.body);
        view.render();
    },
    "groupLandingView": () => {
        createGroupLandingView();
    }
};

export function UrlRouter() {
    const pathName = window.location.pathname;
    const path = pathName.split("/").pop();
    if (routes[path]) {
        routes[path]();
    } else {
        console.warn("No route found:", path);
    }
}


