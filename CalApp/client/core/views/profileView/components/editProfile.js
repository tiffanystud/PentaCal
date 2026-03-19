
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
                
            </style>
            <div id="container">
                <input placeholder="New username"></input>
                <input placeholder="Change password"></input>
                <input placeholder="Repeat password"></input>
                <button>Submit</button>
            </div>
            
        `
    }
}
customElements.define("profile-edit-comp", EditProfile);
