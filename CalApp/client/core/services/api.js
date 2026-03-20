// API-calls
// Alla som använder denna funktionen ska wrappa fetchen med try/catch


// Entity (matcha i router.php)
export async function apiRequest( {entity, method, body = null} ) {
    
    console.log(`RECEIVED REQUEST: ${entity} ${method} ${body} -`)
    
    const options = {
        method: method.toUpperCase(),
        headers: { "Content-Type": "application/json"}       
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const BASE_URL = "http://localhost:8000";
    
    let response;
    
    try {
        
        response = await fetch(`${BASE_URL}/${entity}`, options);
        
    } catch (err) {
        
        // Ge komponenten det den behöver för att förstå men inte stanna upp
        PubSub.publish("Network::Error");
        
    }
    if (!response.ok) {
        
        let e = new Error("Request failed");
        e.response = response;
        
        throw e;
    }
    
    const data = await response.json();
    
    // Uppdarera så denna del alltid returnerar något som alla kan lösa och förstå, komponenter som views (response?)
    // Status måste alltid returneras och en (ev. tom) body + status
    
    return data; 
}