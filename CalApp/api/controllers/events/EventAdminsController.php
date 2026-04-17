<?php

require_once __DIR__ . "/../../services/EventAdminsService.php";
require_once __DIR__ . "/../sendJSON.php";

class EventAdminsController {
    public static function handle($method, $input) {

        try {
            if($method == "GET") {
                $data = EventAdminsService::getAll($input);
                sendJson([$data],200);

            } elseif($method == "POST") {
                if(!isset($input["userId"]) || !isset($input["eventId"]) || !isset($input["canDelete"]) || !isset($input["canEdit"]) || !isset($input["isCreator"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventAdminsService::post($input);
                sendJson([$data],200);

            } elseif($method == "PATCH") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventAdminsService::patch($input);
                sendJson([$data],200);

            } elseif($method == "DELETE") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventAdminsService::delete($input);
                sendJson([$data],200);
            }
        } catch(Exception $error) {
            self::errorHandler($error);
        }

        
    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //POST
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message == "Not found") {
            sendJson(["error" => "Not found"], 404);
        }

        //PATCH
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message == "Not found") {
            sendJson(["error" => "Not found"], 404);
        }


        //DELETE
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message == "Not found") {
            sendJson(["error" => "Not found"], 404);
        }


    }
}

?>