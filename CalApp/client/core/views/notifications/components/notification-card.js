import { apiRequest } from "../../../services/api.js";

export class NotificationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    async connectedCallback() {
        this.notiId = this.data.id;
        if (this.type === "event") {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

            <h2>New event<img src="/assets/icons/x-close-dark.png"></h2>
            <div class="noti-body">
                <h3>${this.data.name}<p>${this.data.date}, ${this.data.time}</p></h3>
                <p class="desc">${this.data.description}</p>
                <p class="location">${this.data.location} <button>View →</button></p>
            </div>
            `;
        } else if (this.type === "message") {
            try {
                let reso = await apiRequest({
                    entity: `users?id=${this.data.senderId}`,
                    method: "GET"
                });
                this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

                <h2>New message<img src="/assets/icons/x-close-dark.png"></h2>
                <div class="noti-body">
                    <h3>From: ${reso.name}<p>${this.data.date}, ${this.data.time}</p></h3>
                    <p class="desc">${this.data.content}</p>
                    <p class="location">test <button>View →</button></p>
                </div>
                `;
            } catch (e) {
                this.errorMsg("other", e.response);
            }
        }

        this.shadowRoot.querySelector("img").addEventListener("click", () => {
            console.log("//Send DELETE-request and delete noti if successfull");
            this.remove();
        })
        this.shadowRoot.querySelector("button").addEventListener("click", () => {
            console.log("//Link to notification source");
        })
    }

    async errorMsg(type, resp) {
        let reso = await resp.json();
        if (type === "network") {
            this.root.innerHTML = `
            <p>Network error, server unreachable</p>
            `
        } else {
            this.root.innerHTML = `
            <p>Status: ${resp.status}<br>${reso.error}</p>
            `
        }
    }
}