import { HttpClient } from "./client";

const core = require("@actions/core")

const authEnabled: boolean = new Boolean(core.getInput("authentication")).valueOf();
const authType: string = core.getInput("authentication-type")
const url: string = core. getInput("url")
const payload: Object = core.getInput("payload")
const method: string = core.getInput("method")

const main = async () => {
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

    core.setOutput("request_result", res)

}

main().then(
    res => {
        core.setOutput("request_result", res)
    }
).catch(
    err => {
        console.log(err)
        core.setFailed("Action failed")
    }
);

