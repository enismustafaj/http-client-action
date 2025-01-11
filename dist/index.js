Object.defineProperty(exports, "__esModule", { value: true });
exports.run = undefined;
const tslib_1 = require("tslib");
const client_1 = require("./client");
const core_1 = tslib_1.__importDefault(require("@actions/core"));
const authEnabled = JSON.parse(core_1.default.getInput("authentication"));
const authType = core_1.default.getInput("authentication-type");
const url = core_1.default.getInput("url");
const payload = core_1.default.getInput("payload");
const method = core_1.default.getInput("method");
const run = async () => {
    const client = client_1.HttpClient.getInstance({
        payload,
        auth: {
            authEnabled,
            authType
        }
    });
    let res;
    switch (method) {
        case "POST":
            res = await client.post(url);
            break;
        case "GET":
            res = await client.get(url);
            break;
        default:
            throw new Error("method not allowed");
    }
    return res;
};
exports.run = run;
(0, exports.run)().then(res => {
    core_1.default.setOutput("request_result", JSON.stringify(res));
}).catch(err => {
    console.log(err);
    core_1.default.setFailed("Action failed");
});
//# sourceMappingURL=index.js.map
