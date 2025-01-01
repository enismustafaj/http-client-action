import { HttpClient } from "./client";

const core = require("@actions/core")

const authEnabled: boolean = JSON.parse(core.getInput("authentication"));
const authType: string = core.getInput("authentication-type")
const url: string = core. getInput("url")
const payload: Object = core.getInput("payload")
const method: string = core.getInput("method")

export const run = async () => {
    const client = HttpClient.getInstance(
        {
            payload,
            auth: {
                authEnabled,
                authType
            }
        }
    );

    let res: any;

    switch(method) {
        case "POST":
            res = await client.post(url)
            break;
        case "GET":
            res = await client.get(url)
            break;      
        default:
            throw new Error("method not allowed")
    }

    return res;

}

run().then(
    res => {
        core.setOutput("request_result", JSON.stringify(res))
    }
).catch(
    err => {
        console.log(err)
        core.setFailed("Action failed")
    }
);

