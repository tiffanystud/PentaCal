import { HomeView } from "./homeView.js"

export function renderHome() {
    let app = document.getElementById("app");
    let view = document.createElement("home-view")
    app.replaceChildren(view)

}
