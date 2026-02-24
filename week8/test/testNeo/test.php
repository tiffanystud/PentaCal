<?php

function GETTest($path) {
    $req = curl_init("http://localhost:8000/$path");

    curl_setopt($req, CURLOPT_RETURNTRANSFER, true);

    $resp = curl_exec($req);
    $status = curl_getinfo($req, CURLINFO_HTTP_CODE);

    if ($resp === false) {
        echo curl_error($req);
    }

    echo "$resp, $status";
}

$GET = ["events", "events?calId=65e10aa11b001", "events?eventId=65e10aa11c001", "events?eventId=65e10aa11c"];

foreach($GET as $path) {
    GETTest($path);
}