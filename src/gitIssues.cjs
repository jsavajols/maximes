// @ts-nocheck
// Octokit.js
// https://github.com/octokit/core.js#readme
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
    auth: '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'
})

async function getListIssues() {
    return octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'jsavajols',
        repo: 'maximes',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

async function getOneIssue(number) {
    return octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: 'jsavajols',
        repo: 'maximes',
        issue_number: number,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

async function getOneIssueComments(number) {
    return octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
        owner: 'jsavajols',
        repo: 'maximes',
        issue_number: number,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

async function run() {
    const listIssues = await getListIssues();
    let oneIssue;
    let numberOfComments;
    let comments;
    // console.log(issues.data);
    for (issue in listIssues.data) {
        console.log(listIssues.data[issue].title);
        console.log(listIssues.data[issue].state);
        console.log(listIssues.data[issue].number);
        console.log(listIssues.data[issue].id);
        oneIssue = await getOneIssue(listIssues.data[issue].number);
        let numberOfComments = oneIssue.data.comments;
        console.log(numberOfComments);
        if (numberOfComments > 0) {
            comments = await getOneIssueComments(listIssues.data[issue].number);
            for (eachComment in comments.data) {
                console.log(comments.data[eachComment].body);
            }
        }
        console.log("=====================================");
    }

}

run();
