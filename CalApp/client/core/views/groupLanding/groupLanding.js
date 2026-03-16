import "./components/eventCard.js";
import "./components/groupDescription.js";
import "./components/groupWeekDays.js";
import { PubSub } from "../../store/pubsub.js"

class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        PubSub.subscribe("change:view", route => {
            if (route.mainPath != "home") {
                console.log("wrong");
                return;
            }
            if (!route.url.searchParams.has("id")) {
                return;
            }

            // if (route.subPath != "groupcalendar") {
            //     console.log("wrong");
            //     return;
            // }

            console.log("created")

            let params = route.url.searchParams;
            let cal = state.userData.cals.find(cal => cal.id == params.get("id"));
            let newState = state.currentContext.currentCal = cal;
            store.setState(newState);
            store.notify(eventName);

            this.render();
        })
    }

    render() {
        this.app.innerHTML = `
        <style>
            #app {
                display: flex;
                flex-direction: column;
                gap: 50px;
            }
        </style>

            <h1>Hejhejhejhejhejhejhejhej</h1>
            <week-days></week-days>
            <event-cards></event-cards>
        `;
    }


}


new CreateGroupLandingView();