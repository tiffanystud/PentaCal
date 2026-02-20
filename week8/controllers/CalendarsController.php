<?php

require_once __DIR__ . "/../services/CalendarsService.php";

class CalendarsController
{
    public static function handle($method, $input): void
    {

        if ($method === "GET") {
            try {
                // Get id from query, else set (no logic) null
                $id = $_GET["id"] ?? null;
                $name = $_GET["name"] ?? null;

                if ($id) {
                    $result = CalendarsService::getById($id);
                } elseif ($name) {
                    $result = CalendarsService::getByName($name);
                } else {
                    $result = CalendarsService::getAll();
                }

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                // Return errors, thrown from services, (HTTP)
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }

        } else if ($method === "POST") {

            try {

                $result = CalendarsService::createCalendar($input);

                http_response_code(201);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }

        } else if ($method === "PATCH") {
            
            try {
                
                $result = CalendarsService::updateCalendar($input); 
                
                http_response_code(200);
                echo json_encode($result);
                return;
                
            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }

        } else if ($method === "DELETE") {

            try {

                $result = CalendarsService::deleteCalendar($input);

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {

                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;

            }
        }
    }

}
