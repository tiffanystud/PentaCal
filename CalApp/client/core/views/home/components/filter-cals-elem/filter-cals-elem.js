import { PubSub } from "../../../../store/Pubsub";
import { EVENTS } from "../../../../store/Events";

class FilterCalendarsElem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    style() {
        return `
            <style>
                #filter-container {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    flex-wrap: wrap;
                }
                #cals {
                    display: flex;
                    gap: 5px;
                    flex-wrap: wrap;
                    flex: 1;
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
                #createGroupBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                    white-space: nowrap;
                }
                #createGroupBtn:hover {
                    background-color: #e0e0e0;
                }
                    
                .selectedBox {
                    background-color: blue;
                }
                    
            </style>
        `
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

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            <div id="filter-container">
                <div id="cals">
                    ${this.html()}
                </div>
                <button id="createGroupBtn">+ Create Group</button>
            </div>
        `
    }
    
    eListeners() {

        let allCalendarBoxes = this.shadowRoot.querySelectorAll(".calBoxes");

        for (let calBox of allCalendarBoxes) {
            
            // subscribe through store
            calBox.addEventListener("click", () => {
                
                if (!calBox.classList.contains("selected")) {
                    
                    const selectedCal = this.userCals.find(cal => calBox.id == cal.id)
                    
                    PubSub.publish(EVENTS.DATA.SELECTED.EVENTS, );
                    PubSub.publish("SELECTEDCALS.EVENTS.STATE.POST", this.userCals.find(cal => calBox.id == cal.id));
                    
                    calBox.classList.add("selectedBox");
                    
                } else {
                    
                    PubSub.publish("SELECTEDCALS.EVENTS.STATE.DELETE", this.userCals.find(cal => calBox.id == cal.id));

                    calBox.classList.remove("selectedBox");
                }
            })
        }
    }


}

customElements.define("filter-calendars-elem", FilterCals);