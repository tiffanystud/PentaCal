
import { UrlRouter } from "./core/router/router.js";

// comps
import "./components/appInput/appInput.js";
import "./components/toggleBtn/toggleBtn.js";

// services
import { initCalendarService } from "./core/services/calendarsService.js";

// Kör routern
UrlRouter();

initCalendarService();