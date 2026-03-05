import displayHome from "../views/home/home.js";
import groupsView from "../views/groupsView/groupsView.js";

const routes = {
    "/home": () => {
      displayHome();
    },
    "/home/groupsView": () => {
      groupsView();
    }
};



function UrlRouter() {
    const url = window.location.pathname;
    routes[url]();
}

window.addEventListener("popstate", UrlRouter);