import { PubSub } from "../../../store/pubsub.js";

export class SearchTags extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.selectedTags = [];
        this.render();
        this.eventListeners();
    }

    html() {
        return `
        <div id="tagsFilter">
            <div id="searchBtn">Search tags</div>
            <div id="selectedTags"></div>
        </div>
        `
    }

    style() {
        return `
            <style>
                #tagsFilter {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                #searchBtn {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 35px;
                    cursor: pointer;
                    background-color: white;
                }
                #selectedTags {
                    display: flex;
                    gap: 10px;
                }
                .tags {
                background-color: white;
                padding: 5px;
                }
            </style>
        `

    }

    eventListeners() {
        this.shadowRoot.querySelector("#searchBtn").addEventListener("click", () => {
            PubSub.publish("Tags::OpenSearchModal");
        })

        PubSub.subscribe("Users::Selected", data => {
            // data.selectedItem
            // data.context
            let tagsDiv = document.createElement("div");
            tagsDiv.classList.add("tags");
            tagsDiv.innerHTML = data.selectedItem;
            this.shadowRoot.querySelector("#selectedTags").appendChild(tagsDiv);
        })

    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}
        `
    }




}


customElements.define("search-tags", SearchTags);