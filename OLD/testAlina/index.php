<?php

function request($method, $endpoint, $data = null)
{
    $url = "http://localhost" . $endpoint;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json"
        ]);
    }

    $response = curl_exec($ch);

    return $response;
}


/* ================= USERS ================= */

echo request("GET", "/friendships?userId=65e10aa11a009");

echo request("POST", "/friendships?userId=65e10aa11a001", [
    "userId1" => "65e10aa11a001",
    "userId2" => "65e10aa11a00a"
]);


echo request("DELETE", "/friendships?userId=65e10aa11a001", [
    "userId1" => "65e10aa11a001",
    "userId2" => "65e10aa11a00a"
]);

echo request("DELETE", "/friendships?userId=65e10aa11a001", [
    "userId1" => "65e10aa11a001",
    "userId2" => "65e10aa11a00a"
]);


/* ================= USERS_GROUPS ================= */

echo request("GET", "/users_calendars");

/*echo request("POST", "/users_calendars", [
    "userId" => 6,
    "groupId" => 5,
    "isAdmin" => false
]);

echo request("PATCH", "/users_calendars", [
    "id" => 3,
    "isAdmin" => true
]);

echo request("DELETE", "/users_calendars", [
    "id" => 3
]);
*/
?>
