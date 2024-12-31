import core from "@actions/core"
import { HttpClient } from "./client";

const authEnabled: boolean = new Boolean(core.getInput("authentication")).valueOf();
const authType: string = core.getInput("authentication-type")
const url: string = core. getInput("url")
const payload: Object = core.getInput("payload")
const method: string = core.getInput("method")

const client = HttpClient.getInstance(
    {
        payload,
        auth: {
            authEnabled,
            authType
        }
    }
);

try {
    let res: any;

    switch(method) {
        case "POST":
            res = await client.post(url)
            break;
        case "GET":
            res = await client.get(url)
        default:
            throw new Error("method not allowed")
    }

    core.setOutput("request_result", res)
} catch(error) {
    core.setFailed(error)
}

