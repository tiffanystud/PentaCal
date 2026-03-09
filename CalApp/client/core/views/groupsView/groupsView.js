import GroupContainerBoxComp from "./components/groupBoxContainerComp/groupBoxContainerComp.js"


function groupsView() {
    customElements.define("groupBox-comp", GroupContainerBoxComp);
    let app = document.getElementById("app");
    app.innerHTML = `<groupBox-comp></groupBox-comp>`;
}


