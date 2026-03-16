import { PubSub } from "../../store/pubsub.js";
//comp
import {BottomNav} from "../../../components/bottomNav/bottomNav.js";

export class CreateEvent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});
        PubSub.subscribe("change:page", (data) => {
            if(data.page === "add"){ //bottom Nav
                this.render();
            }
        });
        PubSub.subscribe("change:view", (data) => {
            if(data.url === "/home/createEvent"){ //url
                this.render();
            }
        });
    }

    html() {
        return `
            <h1>Create Event</h1>
            <div class="container">
                <h3>Event name</h3>
                <input>

                <h3>Decription</h3>
                <input>

                <h3>Adress</h3>
                <input>

                <h3>Tags</h3>
                <input>

                <h3>Files</h3>
                <input type="file">

                <h3>Date</h3>
                <input type="date">

                <h3>Estimated time</h3>
                <input type="time">

                <h3>URl(Distance event)</h3>
                <input>

                <button>Create Event</button>
            </div>
            
            
        `
    }
    style() {
        return `
            h1 {
                text-align:center;
            }
            .container {
                display:flex;
                flex-direction:column;
            }
            button {
                height: 50px;
                width:150px;
            }
            
        `
    }
    render() {
        console.log("createEventClass")
        let app = document.getElementById("app");
        let content = this.shadowRoot.innerHTML = `
            <style>
                ${this.style()}
            </style>
            ${this.html()}
        `;
        app.innerHTML = content;

    }
}
customElements.define("create-event", CreateEvent);
