import { store } from "../../core/store/store.js";
import { PubSub } from "../../core/store/pubsub.js";
import { EVENTS } from "../../core/store/events.js";


export class CalendarInfoPopUp extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.calId = 0;
        
        PubSub.subscribe("change:detailbtn", (calId) => {
            this.calId = calId;
        })
    }

    connectedCallback(){
        this.renderPopup();
    }

    async getMembers(){
        let memberContainer = document.createElement("div");
        memberContainer.id = "member-circles";
        if (this.calId !== 0){
            let members;
            try {
                members = await apiRequest({
                entity: `users?calId = ${this.calId}`,
                method: "GET"
                })
            } catch (err){
                const notFound = document.createElement("div");
                notFound.textContent = "Problem finding members";
                return memberContainer.appendChild(notFound);
            }
            for (let m of members){
                const mdiv = document.createElement("div");
                mdiv.classList.add("member-circle");
                mdiv.style.backgroundColor = this.randomColor();

                const initials = m.name
                .split(" ")
                .map(part => part[0])
                .join("")
                .toUpperCase();


                mdiv.textContent = initials;

                memberContainer.appendChild(mdiv);
            }
        } 
        return memberContainer;
    }

    randomColor() {
        const colors = ["#ff9999", "#99ccff", "#b7e2e6", "#ffcc99", "#d0b8ac", "#cc99ff", "#cdb4db", "#99ffcc", "#acd8aa", "#add8e6", "#81c6e8"  ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    renderPopup(){

        this.shadowRoot.innerHTML = `
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                width: 390px;
                padding: 8px 20px;
            }

            .header {
                padding-top: 32px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
            }

            h3 {
                margin: 0;
                font-size: 20px;
            }

            .icon {
                width: 24px;
                height: 24px;
            }
            .button-container {
                height: 140px;
                display: flex;
                justify-content: center;
                align-items: flex-end;
            }
            button {
                font-weight: 600;
                font-size: 16px;
                color: rgb(166, 32, 32);
                padding: 16px 32px;
                background-color: #d9d9d9;
                border: none;
                border-radius: 20px;
            }
        
        </style>
        
        <div id="top"><button class="icon" id="close"></button></div>
        <div class="header">
            <h3>WDU 2024</h3>
            <button class="icon" id="edit">
        </div>
        <div id="desc"><p>Bla bla och något mer bla</p></div>
        <div id="members">
            <div class="header"><h3>Members</h3><button class="icon" id="dropDIcon"></div>
            ${getMembers()}
            <div id="admins">
                <div class="member-card"></div>
            </div>
            <div class="button-container">
                <button>Leave calendar</button>
            </div>
        </div>
        
        `;

    }
}