<?php

// Middleware
require_once __DIR__ . "/../middleware/Middleware.php";

// Controllera
require_once "UserController.php";
require_once "GroupsController.php";
require_once "UsersCalendarsController.php";
require_once "UsersAvailabilitiesController.php";
require_once "EventsRSVPController.php";
require_once "BackupDBController.php";
require_once "RestoreDBController.php";
require_once "FriendshipsController.php";


function Router($requestUrl = null){   
    
    if ($requestUrl === null) {
        $requestUrl = $_SERVER["REQUEST_URI"] ?? "";
    }

    
    $urlPath = parse_url($requestUrl, PHP_URL_PATH);
    $path = ltrim($urlPath, "/");

    $method = $_SERVER["REQUEST_METHOD"];
    
    if ($method == "GET"){
        $input = $_GET ?? [];
    } else {
        $input = json_decode(file_get_contents("php://input"), true) ?? [];
    }

    switch ($path) {
            
        case "calendar":
            
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    GroupsController::handle(method: $method, input: $input);
                    break;
                    
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    GroupsController::handle(method: $method, input: $input);
                    break;
            }
            break;

        case "calendar_msg": 
            //Handle calendar_msg
            break;

        case "events":
            //Handle events
            break;

        case "event_admins":
            //Handle event_admins
            break;

        case "events_rsvp":
            //Handle event_rsvp
            break;

        case "friendships":
                switch ($method) {
                    case "GET": 
                        CorsMiddleware::handle();
                        FriendshipsController::handle($method, $input);
                        exit();
                     
                    case "POST":
                        CorsMiddleware::handle();
                        JsonMiddleware::handle();
                        FriendshipsController::handle($method, $input);
                        exit();

                    case "DELETE":
                        CorsMiddleware::handle();
                        FriendshipsController::handle($method, $input);
                        exit();
                    default:
                        CorsMiddleware::handle();
                        http_response_code(400);
                        echo json_encode(["error" => "No method allowed"]);
                        exit();
                }

        case "private_msg":
            //Handle private msg
            break;

        case "users": //Elias
                switch ($method) {
                    case "GET": 
                        CorsMiddleware::handle();
                        UserController::handle($method, $input);
                        exit();
                     
                    case "PUT":
                        CorsMiddleware::handle();
                        UserController::handle($method, $input);
                        exit();
                         
                    case "POST":
                        CorsMiddleware::handle();
                        UserController::handle($method, $input);
                        exit();
                    case "PATCH":
                        $input = $_GET ?? [];
                        CorsMiddleware::handle();
                        UserController::handle($method, $input);
                        exit();
                    case "DELETE":
                        $input = $_GET ?? [];
                        CorsMiddleware::handle();
                        UserController::handle($method, $input);
                        exit();
                    default:
                        CorsMiddleware::handle();
                        http_response_code(400);
                        echo json_encode(["error" => "No method allowed"]);
                        exit();
                }

        case "users_availabilities":
            
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersAvailabilitiesController::handle($method, $input);
                    break;
                   
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersAvailabilitiesController::handle($method, $input);
                    break;
            }
            break;
            
        case "users_calendars":
            
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersCalendarsController::handle($method, $input);
                    break;
                
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersCalendarsController::handle($method, $input);
                    break;
            }  
            break;      

        case "users_pinned_calendars":
            //Handle users_pinned_calendars
            break;
            
        case "backup_database":
            CorsMiddleware::handle();
            BackupDBController::handle();
            break;

        case "restore_database":
            CorsMiddleware::handle();
            RestoreDBController::handle();
            break;
            
        default:
            http_response_code(404); 
            echo json_encode(["error" => "Route not found"]); 
            break;
    }
}
