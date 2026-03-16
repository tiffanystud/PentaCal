import { PubSub } from "../store/pubsub.js";

// ROUTER FÖRSLAG
// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ EVENTET SOM SEDAN GER URL ELLER PARAMS OCH RENDERAR
export class TestRouter {
    constructor(url) {
        this.path = url; // sträng
        this.urlParts = url.split("/").filter(Boolean);

        this.mainPath = this.urlParts[0];
        this.subPath = this.urlParts[1];

        PubSub.publish("change:view", {
            url: this.path, //sträng
            mainPath: this.mainPath,
            subPath: this.subPath
        });


        

    }

    navigate(path) {
        console.log("Navigate func")
        history.pushState({}, "", path);
        new TestRouter(path);
    }

    init() {
        console.log("Init func")
        window.addEventListener("popstate", () => {
            new TestRouter(window.location.pathname);
        });
    }


}
