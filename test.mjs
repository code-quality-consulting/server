import http from "http";
import assert from "assert";

function get_requestor(callback) {
    const options = {
        host: "localhost",
        port: 8080
    };
    http.get(options, function (response) {
        console.log(response.headers);
        const status_code = response.statusCode;
        const content_type = response.headers["content-type"];

        let error;
        if (status_code !== 200) {
            error = new Error(
                "Request Failed.\n"
                +
                `Status Code: ${status_code}.`
            );
        }
        if (status_code === 200) {
            if (
                !(/^text\/html$/.test(content_type))
            ) {
                error = new Error(
                    "Invalid content-type.\n"
                    +
                    `Expected text/html but received ${content_type}.`
                );
            }

            if (/^text\/html$/.test(content_type)) {
                callback({
                    status_code,
                    content_type
                });
                response.setEncoding("utf8");
                let rawData = "";
                response.on("data", function (chunk) {
                    rawData += chunk;
                });
            }
        }
        if (error) {
            callback(undefined, error);
            response.resume();
        }
        response.on("end", function () {
        });
    }).on("error", function (error) {
        const {message} = error;
        callback(undefined, message);
    });

}

function log_server(response, reason) {
    if (response === undefined) {
        console.log(reason);
        console.error("Failure: \n");
        console.error(reason);
    }
    if (response !== undefined) {
        const status_code = response["status_code"];
        const content_type = response["content_type"];
        console.log(content_type);
        assert.equal(content_type, "text/html");
        assert.equal(status_code, "200");
    }
}

get_requestor(log_server);
