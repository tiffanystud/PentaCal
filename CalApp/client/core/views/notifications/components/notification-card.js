export class NotificationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.notiId = this.data.id;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

        <h2>Title<img src="/assets/icons/x-close-dark.png"></h2>
        <div class="noti-body">
            <h3>${this.data.name}<p>${this.data.date}, ${this.data.time}</p></h3>
            <p class="desc">${this.data.description}</p>
            <p class="location">${this.data.location} <button>View</button></p>
        </div>
        `;

        this.shadowRoot.querySelector("img").addEventListener("click", () => {
            console.log("//Send DELETE-request and delete noti if successfull");
            this.remove();
        })
        this.shadowRoot.querySelector("button").addEventListener("click", () => {
            console.log("//Link to notification source");
        })
    }
}