<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class CalendarsService
{


    /* ---- GET ---- */
    public static function getAll()
    {

        // Hämtar db för bara cals, conatructorn sätter resource till ex: "calendars"
        $db = new DBAccess("calendars");
        $cals = $db->getAll();

        if (empty($cals)) {
            throw new Exception("No calendars found");
        }

        return $cals;

    }

    public static function getById($id)
    {
        // Hämtar db för bara cals, conatructorn sätter resource till ex: "calendars"
        $db = new DBAccess("calendars");
        $cal = $db->findById($id);

        if (!$cal) {
            throw new Exception("Calendar not found");
        }

        return $cal;
    }
    public static function getByName($name)
    {
        // Hämtar db för bara calendars, conatructorn sätter resource till ex: "calendars"
        $db = new DBAccess("calendars");
        $cal = $db->findById($name);

        if (!$cal) {
            throw new Exception("Calendar not found");
        }

        return $cal;
    }



    /* --- POST ---- */
    public static function createCalendar($input)
    {

        if (!isset($input["name"])) {
            throw new Exception("Calendar must have a name");
        }

        $db = new DBAccess("calendars");

        $newCal = [
            "id" => uniqid(),
            "name" => $input["name"]
        ];

        return $db->postData($newCal);
    }

    /* --- PATCH ---- */
    public static function updateCalendar($input){
        
        // Id and name needed for patch
        if (!isset($input["id"])) {
            throw new Exception("Id missing");
        }
        if (!isset($input["name"])) {
            throw new Exception("Name missing");
        }
        
        $db = new DBAccess("calendars");

        return $db->patchData($input["id"], ["name" => $input["name"]]);
            
    }


    /* --- DELETE ---- */
    public static function deleteCalendar($input)
    {

        $db = new DBAccess("calendars");

        if (!isset($input["id"])) {
            throw new Exception("Id missing");
        }
        $id = $input["id"];

        return $db->deleteData($id);

    }





}