export class HomeView extends HTMLElemement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.currentView = "my-calendar";
    }
    connectedCallback(){
        this.render()
    }

    switchView(view){
        this.currentView = view;
        this.render()
    }
    render(){
        const view = this.currentView === "my-calendar"
        ? "<my-calendar></my-calendar>"
        : "<my-groups></my-groups>"

        this.shadowRoot.innerHTML = `
        <style>
            #btn-container{
                width: 350px;
                height: 80px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .active landing-button{
                background-color: #ffffff;
            }
        </style>
        <div id="btn-container">
            <landing-button id="my-cal" ${this.currentView === "my-calendar" ? "active" : ""}></landing-button>
            <landing-button id="my-groups" ${this.currentView === "my-groups" ? "active" : ""}></landing-button>
        </div>
        <div class="view">
        ${view}
        </div>
        `;
        this.shadowRoot.getElementById("my-cal").addEventListener("click", () => this.switchView("my-calendar"));
        this.shadowRoot.getElementById("my-groups").addEventListener("click", () => this.switchView("my-groups"));
    }

}