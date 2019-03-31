import http from "http";
import parseq from "./dependencies/parseq.mjs";
import assert from "assert";

function get_requestor(callback, value) {
    const options = {
        port: 8081
    };
    http.get("localhost", options, function(response) {
        const status_code = response.statusCode;
        const content_type = res.headers["content-type"];

        let error;
        if (status_code !== 200) {
           error = new Error(`Invalid content-type.\n`
               + `Expected text/plain but received ${content_type}.`
           );
        }
        if (status_code === 200) {
            if (
                !(/^text\/plain$/.test(content_type))
            ) {
                callback(undefined, error);
                response.resume(); 
            }

            if (/^text\/plain$/.test(content_type)) {
                callback(response); 
            }
        }
    });
}

function log_server(value, reason) {
    if (value === undefined) {
         console.log(reason);
    }
    if (value !== undefined) {
         console.log(value);
    }
}

get_requestor(log_server);
