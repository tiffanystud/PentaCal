import storeCon from "./store2.js";

const store = storeCon({
    layout: "grid",
    theme: "light"
})

const layoutBtn = document.getElementById("layoutBtn");
const container = document.getElementById("container");
const themeBtn = document.getElementById("themeBtn");

store.subscribe(
    layout => {
        container.className = layout;
        console.log("Layout updated:", layout);
    },
    state => state.layout
);

layoutBtn.addEventListener("click", () => {
    store.setState({
        layout: store.getState().layout === "list" ? "grid" : "list"
    });
});

store.subscribe(
    theme => {
        document.body.dataset.theme = theme;
        console.log("theme updated:", theme);
    },
    state => state.theme
);

themeBtn.addEventListener("click", () => {
    store.setState({
        theme: store.getState().theme === "light" ? "dark" : "light"
    });
});