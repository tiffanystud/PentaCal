import "./components/eventCard.js";
import "./components/groupDescription.js";
import "./components/groupWeekDays.js";


export function createGroupLandingView() {
    console.log("hej!");

    let app = document.querySelector("#app");

    app.innerHTML = `
          
            <event-cards></event-cards>
        `;
}

customElements.define("my-groups", createGroupLandingView);