import { store } from "../../../store/store.js";
import { PubSub } from "../../../store/pubsub.js";

class FilterCals extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.userCals = store.getState().cals;
        console.log(this.userCals);
        this.render();

        // store.subscribe("cals", (data) => {
        //     this.userCals = data;
        //     this.render();
        // })
        this.eventListeners();
    }

    html() {
        let allHtml = "";
        for (let cal of this.userCals) {
            allHtml += `
                <div class="calBoxes" id="${cal.id}">${cal.name}</div>
            `
        }
        return allHtml;
    }

    style() {
        return `
            <style>
                #cals {
                    display: flex;
                    gap: 5px;
                    flex-wrap: wrap;
                }
                .calBoxes {
                    display: flex;
                    gap: 5px;
                    background-color: white;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    cursor: pointer;
                }
            </style>
        `
    }

    eventListeners() {
        let allCals = this.shadowRoot.querySelectorAll(".calBoxes");
        for (let pressedCals of allCals) {
            // subscribe through store
            pressedCals.addEventListener("click", () => {
                if (!pressedCals.classList.contains("selected")) {
                    PubSub.publish("SELECTEDCALS.EVENTS.STATE.POST", this.userCals.find(cal => pressedCals.id == cal.id));
                    pressedCals.style.backgroundColor = "blue";
                    pressedCals.classList.add("selected");
                } else {
                    PubSub.publish("SELECTEDCALS.EVENTS.STATE.DELETE", this.userCals.find(cal => pressedCals.id == cal.id));
                    pressedCals.style.backgroundColor = "white";
                    pressedCals.classList.remove("selected");
                }
            })
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            <div id="cals">
             ${this.html()}
            </div>
        
        `
    }


}

customElements.define("filter-cals", FilterCals);