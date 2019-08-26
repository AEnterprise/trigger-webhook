import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
    try {
        const CURL_ARGS = core.getInput('CURL_ARGS');
        const METHOD = core.getInput('METHOD');
        const URL = core.getInput('URL');
        core.debug(CURL_ARGS)
        const options = {
            failOnStdErr: true
        };
        const args = [`-X ${METHOD}`, `"${URL}"`];
        CURL_ARGS.split(/(?= --?[A-z]+ ["'])(?: )/g).forEach((part) => args.push(part));
        await exec.exec("curl", args, options);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
