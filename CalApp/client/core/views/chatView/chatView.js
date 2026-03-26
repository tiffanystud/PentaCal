import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { apiRequest } from "../../services/api.js";


export class ChatView extends HTMLElement {
    constructor() {
        super();
        this.state;
        this.attachShadow({ mode: "open" });
        PubSub.subscribe("change:page", (data) => {
            console.log("SUB FIRED", data);
            if (data.page === "chat") {
                this.render();
            }

        });
        PubSub.subscribe("change:view", (data) => {

            if (data.mainPath === "home" && data.subPath === "chat") {
                this.render();
            }

        });

       
    }
    

       

    

    render() {
        let content = document.querySelector("#content");
        let state = store.getState();

        content.innerHTML = `
        <style>
            #data {
                background: grey;
                padding: 5px;

            }
        </style>
        <h2>Chats</h2>
        <app-input id="searchBar" placeholder="Type a calender, group, friend or event"></app-input>
        <div id="data"></div>
    `
    const searchBar = content.querySelector("#searchBar");
    let dataDiv = content.querySelector("#data");

    let allEvents = state.events; //[{name}]
    let allCals = state.cals; //[{name}]
    let allFriends = state.friends;
    
    let allData = [...allEvents, ...allCals, ...allFriends];
    let allNames = [];
    for(let data of allData) {
        if(data.name) {
            allNames.push(data.name.toLowerCase())
        }
    }


    searchBar.addEventListener("input", function(event) {
        dataDiv.innerHTML = "";

        let valueInput = searchBar.getValue().toLowerCase();
        if (valueInput.length > 1) {
            for (let name of allNames) {
                if (name.toLowerCase().includes(valueInput)) {
                    const div = document.createElement("div");
                    div.textContent = name[0].toUpperCase() + name.slice(1).toLowerCase();
                    div.style.background = "white";
                    div.style.padding = "5px"
                    div.style.borderBottom = "1px solid black"
                    dataDiv.appendChild(div)
                }
            }
        }

    


        
        
    })}
    

}

customElements.define("chat-view", ChatView)

new ChatView();

