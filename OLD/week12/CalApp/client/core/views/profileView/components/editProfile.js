import {apiRequest} from "../../../services/api.js"

export default class EditProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});

        this.shadowRoot.innerHTML = `
            <style>
                #container {
                    display:flex;
                    flex-direction: column;
                }
                #container div {
                    margin-top: 7px;
                    background-color: #999898;
                    padding: 8px;
                    border-radius: 10px;
                }
                
            </style>
            <div id="container">
                <div id="usernameDiv">
                    <app-input placeholder="New username"></app-input>
                    <regular-button>Save changes</regular-button>
                </div>
                <div id="passDiv">
                    <app-input placeholder="New password"></app-input>
                    <app-input placeholder="Reapet password"></app-input>
                    <regular-button>Save changes</regular-button>

                </div>
                <div id="emailDiv">
                    <app-input placeholder="New email"></app-input>
                    <regular-button>Save changes</regular-button>
                </div>
                
            </div>
        `
        this.logic();
    }
    logic() {
        const usernameDiv = this.shadowRoot.getElementById("usernameDiv");
        const passDiv = this.shadowRoot.getElementById("passDiv");
        const emailDiv = this.shadowRoot.getElementById("emailDiv");

        const usernameBtn = usernameDiv.querySelector("regular-button");
        const passBtn = passDiv.querySelector("regular-button");
        const emailBtn = emailDiv.querySelector("regular-button");

        usernameBtn.addEventListener("click", () => { //vrf arraow istället för function()
            const usernameInput = usernameDiv.querySelector("app-input");
            this.updateUsername(usernameInput.value);
        })
        passBtn.addEventListener("click", () => {
            this.updatePass();
        })
        emailBtn.addEventListener("click", () => {
            this.updateEmail();
        })
    
    }
    updateUsername() {
        
    }
    updatePass() {

    }
    updateEmail() {

    }
}
customElements.define("profile-edit-comp", EditProfile);
