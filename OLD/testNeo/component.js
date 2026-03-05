class Circle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.title = "Cool circle";
        this.style.borderRadius = "50%";
        this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        this.style.display = "flex";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        this.style.height = "100px";
        this.style.width = "100px";
        this.style.padding = "10px";
        this.addEventListener("click", async (e) => {
            // let resp = await fetch("https://random-word-api.herokuapp.com/word");
            // let reso = await resp.json();
            // e.srcElement.innerHTML = `<p>${reso[0]}</p>`;
            e.srcElement.innerHTML = `<p>I was clicked!</p>`;
            let circle = document.createElement("cool-circle");
            document.querySelector("#circles").appendChild(circle);
            setTimeout(() => {
                e.srcElement.innerHTML = "<p>Click me!</p>";
            }, 1000);
        });
        this.innerHTML = `
        <p>Click me!</p>
        `;
    }
}

customElements.define("cool-circle", Circle);

let circle = document.createElement("cool-circle");
document.querySelector("#circles").appendChild(circle);