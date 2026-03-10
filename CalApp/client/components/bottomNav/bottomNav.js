
export class BottomNav extends HTMLElement { 
    
        constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/bottomNav/bottomNav.css">

            <div class="button-container">
                
                <button class="nav-btn home">
                    <img class="icon-dark" src="../../assets/icons/home-dark.png">
                    <img class="icon-dark" src="../../assets/icons/home-light.png">
                </button>
                
                <button class="nav-btn users">
                    <img class="icon-dark" src="../../assets/icons/users-dark.png">
                    <img class="icon-dark" src="../../assets/icons/users-light.png">
                </button>
                
                <button class="nav-btn add">
                    <img class="icon-dark" src="../../assets/icons/add-dark.png">
                    <img class="icon-dark" src="../../assets/icons/add-light.png">
                </button>
                
                <button class="nav-btn notiflications">
                    <img class="icon-dark" src="../../assets/icons/send-dark.png">
                    <img class="icon-dark" src="../../assets/icons/send-light.png">
                </button>
                
                <button class="nav-btn profile">
                    <img class="icon-dark" src="../../assets/icons/profile-dark.png">
                    <img class="icon-dark" src="../../assets/icons/profile-light.png">
                </button>
                
            </div>
        `
        }
}

customElements.define("toggle-btn", ToggleBtn);
