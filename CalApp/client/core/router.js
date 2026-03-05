document.body.innerHTML = `
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    </nav>
    <div id="app"></div>
`;

class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("hashchange", this.handleRouterChange.bind(this));
        this.handleRouterChange();
    }
    handleRouterChange() {
        const hach = window.location.hash.slice(1);
        console.log(hach);
        const route = this.routes[hach];
        if(route) {
            document.getElementById("app").innerHTML = route();
        } else {
            document.getElementById("app").innerHTML = "404 not found";
        }
    }
}

const routes = {
    home:function() {
        return "<h1>Home Page</h1>"
    },
    about:function() {
       return "<h1>About Page</h1>"
    },
    contact: function() {
       return "<h1>Contact Page</h1>"
    },

}
const router = new Router(routes);
router.handleRouterChange();