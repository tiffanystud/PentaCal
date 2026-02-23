const tester = async function(url, method, body) {
    if (method === "GET" || !method) {
        let req = new Request(url, {
            method: method
        });
        let resp = await fetch(req);
        let reso = await resp.json();
        console.log(reso);
    } else {
        let req = new Request(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });
        let resp = await fetch(req);
        let reso = await resp.json();
        console.log(reso);
    }
}

tester("http://localhost:8000/events", "DELETE", {
    calId: "65e10aa11b001",
    eventId: "65e10aa11c001"
});