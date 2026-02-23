<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class FriendshipsService{

    public static function getAllFriendsByUser($userId){
        $usersDb = new DBAccess("friendships");
        $friendsDb = new DBAccess("friendships");

        if (!$usersDb->findById($userId)) {
            throw new Exception("User not found", 404);
        }
        $relations = $friendsDb->getAll();
        $friendsIds = array_map(fn($r) => $r["userId1"] == $userId);

        $friends = [];
        foreach ($friendsIds as $fId){
            $friend = $usersDb->findById($fId);
            if ($friend) {
                $friends[] = ["name" => $friend["name"]];
            }
        }
        return $friends;
    }

    public static function getFriendship($id1, $id2){
        if (!$userId1 || !$userId2) {
            throw new Exception("Missing parameters", 400);
        }
        $friendsDb = new DBAccess("friendships");
        $relations = $friendsDb->getAll();

        foreach ($relations as $rel) {
            if (
                ($rel["userId1"] == $userId1 && $rel["userId2"] == $userId2) ||
                ($rel["userId1"] == $userId2 && $rel["userId2"] == $userId1)
            ) {
                return $rel;
            }
        }
        throw new Exception("Friendship not found", 404);
    }

    public static function newFriend($id){
        $message = ["message" => "This service is not done."];
        return $message;
    }

    public static function deleteFriend($userId, $input)
    {
        if (!isset($input["friendId"])) {
            throw new Exception("Missing friendId", 400);
        }

        $friendsDb = new DBAccess("friendships");

        $relations = $friendsDb->getAll();

        foreach ($relations as $rel) {
            if (
                $rel["userId"] == $userId &&
                $rel["friendId"] == $input["friendId"]
            ) {
                return $friendsDb->deleteData($rel["id"]);
            }
        }

        throw new Exception("User not found", 400);
    }
}



?>