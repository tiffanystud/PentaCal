import { PubSub } from "../store/pubsub.js";

// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ EVENTET SOM SEDAN GER URL ELLER PARAMS OCH RENDERAR
export class Router {
    constructor(url) {
        this.url = new URL(url);
        this.urlPaths = this.url.pathname.split("/").filter(Boolean);
        this.mainPath = this.urlPaths[0] ? this.urlPaths[0] : "/";
        this.subPath = this.urlPaths[1];

        // Change:view är eventet som alla vyer lyssnar på via subscribe, om url matchar när vyn subscribar, så renderar den
        PubSub.publish("change:view", {
            url: this.url,
            mainPath: this.mainPath,
            subPath: this.subPath,
        })

    }

    navigate(path) {
        history.pushState({}, "", path);
        new Router(path);
    }

    init() {
        window.addEventListener("popstate", () => {
            new Router(window.location.pathname);
        });
    }


}