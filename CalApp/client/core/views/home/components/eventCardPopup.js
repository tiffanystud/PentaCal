import { PubSub } from "../../../store/pubsub.js";

class EventCardPopup extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.event = {};
        PubSub.subscribe("EVENT.RESOURCE", data => {
            this.event = data;
            this.render();
        })
    }

    html() {
        return `
            <div id="eventPopup">
                <h1>Event</h1>
                <h3>${this.event.name}</h3>
                <p class="datumPlats">${this.event.date}</p>
                <p class="datumPlats">${this.event.location}</p>
                <div>

                </div>
            </div>
        `
    }

    style() {
        return `
            <style>
                #eventPopup {
                    width: 300px;
                    height 500px;
                    position: absolute;
                }
            
            
            </style>

        `

    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}

        `
    }



}

customElements.define("event-card-popup", EventCardPopup);