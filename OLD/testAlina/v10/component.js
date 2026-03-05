function getStyle() {
  return `
    :root {
        --color-white: #fff;
        --color-orange: #FB6900;
        --color-red: #F63700;
        --color-night: #004853;
        --color-twilight: #007E80;
        --color-day: #00B9BD;


}
    .friend-card {
        margin: 5px 200px;
        width: 100px;
        height: 24px;
        box-sizing: border-box;
        padding: 15px;
        border-radius: 8px;
        border: 4px solid var(--color-twilight);
        background: var(--color-orange);
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }

  `;
}

export class FriendCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set friend(data) {
    this._friend = data;
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>${getStyle()}</style>
      <div class="friend-card">${this._friend.name ?? ""}</div>
    `;
  }
}

customElements.define("friend-card", FriendCard);