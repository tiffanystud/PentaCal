import { store } from "../../store/Store.js";
import { apiRequest } from "../ApiService";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";

// Denna service kan användas för att bearbeta event beroende på view och komponenter som berör events 
class calendarAPIService {
}

export const CalendarAPIService = new calendarAPIService()