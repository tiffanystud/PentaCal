class Box extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.innerHTML = `<p>Hej!</p>
        <style> 
        cool-box {
            background-color: lime;
            height: 100px;
            display: block;
        }
        </style>
        `;
    }
}

customElements.define("cool-box", Box);

document.body.appendChild(document.createElement("cool-box"));