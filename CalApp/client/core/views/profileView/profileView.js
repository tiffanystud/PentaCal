import { PubSub } from "../../store/pubsub.js";
import {store} from "../../store/store.js"
import "./components/editProfile.js"

export class ProfileView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});

        this.username = store.getState().isLoggedIn.username;
        this.email = store.getState().isLoggedIn.email;

        PubSub.subscribe("change:page", (data) => {
            if(data.page === "profile"){ //bottom Nav
                this.render();
            }
        });
        PubSub.subscribe("change:view", (data) => {
            if(data.url.pathname === "/home/profile"){ 
                this.render();
            }
        });
    }
    render() {
        let app = document.getElementById("app");
        app.innerHTML = `
        <style>
            #content {
                height: 100%; 
                display: flex;
                flex-direction: column;
            }
            #container {
                display: flex;
                flex-direction: column;
                height: 80%; 
                overflow-y: auto;
                gap: 10px;
                align-items: center;
            } 
            h3 {
                text-align: center;
            }  
            h2,p {
                margin:5px;
            }
            img {
                width: 60px;
            }
            .btnContainer {
                display:flex;
                gap: 5px;
                margin-top: 15px;
            }
            button {
                padding: 20px;
            }
            profile-edit-comp {
                width: 100%;
            }

        </style>
        <div id="content">
            <landing-button-container>
                <landing-button label="My Calendar" view="home" active></landing-button>
                <landing-button label="My Groups" view="groupcalendar"></landing-button>
            </landing-button-container>
            <h3>Profile</h3>
            <div id="container">
                <img src="./../assets/icons/home-dark.png"></img>
                <h2>${this.username ? this.username : "Guest"}</h2>
                <p>${this.email ? this.email : ""}</p>
                <div class="btnContainer">
                    <button class=" btnProfile profileBtnEdit ">Edit profile</button>
                    <button class=" btnProfile profileLogout">Log out</button>
                </div>
            </div>
            <bottom-nav>
            
        </div>            
        `;
        const btnProfile = app.querySelectorAll(".btnProfile");
        for(let btn of btnProfile) {
            if(btn.classList.contains("profileBtnEdit")) {
                btn.addEventListener("click", () => {
                    const container = document.getElementById("container");
                    let profileEditComp = container.querySelector("profile-edit-comp");
                    if (profileEditComp) {
                        profileEditComp.remove();
                    } else {
                        const editComp = document.createElement("profile-edit-comp");
                        container.appendChild(editComp);
                    }
                });
            } 
        }
        
    }
}
customElements.define("profile-view", ProfileView);
new ProfileView();