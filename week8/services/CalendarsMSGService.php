<?php

require_once __DIR__ . "/../repository/DBAccess.php";
require_once __DIR__ . "CalendarService.php";

class CalendarsMSGService {
    /* ---- GET ---- */
    public static function getAll($input){
        
        $senderId = $input["senderID"] ?? null;
        $calId = $input["calID"] ?? null;
        
        if (!isset($senderId, $calId)) {
            throw new Exception("Missing attributes");
        }
        
        $db = new DBAccess("calendar_msg");
        $items = $db->getAll();
                   
        $filtered = [];

        // Säkerställer vi bara en rad med samma userID och eventId?
        foreach ($items as $currItem) {
            if ($currItem["senderID"] == $senderId && 
                $currItem["calId"] == $calId 
                ) {
                $filtered[] = $currItem;
            }
        }

        if (!$filtered) {
            throw new Exception("Messages not found");
        }
        
        return json_decode(json_encode($filtered), true);
 
    }

    /* --- POST ---- */
    public static function create($input){
        
        $senderId = $input["senderID"] ?? null;
        $calId = $input["calID"] ?? null;
        $content = $input["content"] ?? null;
        
        if (!isset($eventId, $userId, $content)) {
            throw new Exception("Missing attributes");
        }
        
        // $calendars = CalendarsService::calendarsGetAll();
        
        $dbCals =  new DBAccess("calendars");
        $itemsCals = $dbCals->getAll();
        
        // Does calendar exist
        foreach ($itemsCals as $currItem) {
            if ($currItem["userId"] == $calId) {
                throw new Exception("Invalid calendar");
            }
        }
    
        
        // Create new MSG
        $date = date("Y-m-d");
        $time = date("H:i:s");
        
        $newMSG = [
            "id" => uniqid(),
            "senderId" => $senderId,
            "calId" => $calId,
            "date" =>  $date,
            "time" => $time,
            "content" => $content
        ];
            
        $dbCalMsg =  new DBAccess("calendar_msg");
        
        // New item returned
        $result = $dbCalMsg->postData($newMSG);
        return $result;        
            
    }



    /* --- PATCH ---- */
    public static function update($input)
    {
            
        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        $isGoing = $input["isGoing"] ?? null;
        $reminder = $input["reminder"] ?? null;
        
        if (!isset($eventId, $userId, $isGoing, $reminder)) {
            throw new Exception("Missing attributes");
        }
        
        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        foreach ($items as $currAvailability) {
            if (
                $currAvailability["userId"] == $userId &&
                $currAvailability["eventId"] == $eventId
                ) {
                    // Chech if RSVP already is the same (change possible for isGoing/reminder)
                    if ($currAvailability["isGoing"] == $input["isGoing"] &&
                        $currAvailability["reminder"] == $input["reminder"]
                    ) {
                        throw new Exception("No changes made");
                    }
                    
                    // Uppdara date som "latest change" eller när RSVP är skapad?
                    $date = date("Y-m-d");
                    
                    if ($currAvailability["isGoing"] !== $input["isGoing"]) {
                        $changes = ["isGoing" => $input["isGoing"], "date" => $date];
                    } else {
                        $changes = ["reminder" => $input["reminder"], "date" => $date];   
                    }
                    
                    // Updated item
                    return $db->patchData($currAvailability["id"],$changes);
            }
                
        }
                
        throw new Exception("RSVP not found");
        
    }


    /* --- DELETE ---- */
    public static function delete($input)
    {

        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        
        if (!isset($eventId, $userId)) {
            throw new Exception("Missing attributes");
        }
        
        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        foreach($items as $currAvailability) {
            if (
                $currAvailability["eventId"] == $eventId &&
                $currAvailability["userId"] == $userId
                ) {
                    // Returns deleted item
                    return $db->deleteData($currAvailability["id"]);
                }
        }
    
        throw new Exception("RSVP not found");
        
    }

}