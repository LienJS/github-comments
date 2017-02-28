const Lien = require("lien")
    , GitHub = require("gh.js")
    ;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const server = new Lien()
    , ghClient = new GitHub(GITHUB_TOKEN)
    ;

server.addPage("/:owner/:name", lien => {
    debugger
    ghClient.get(`repos/${lien.params.owner}/${lien.params.name}/issues/comments`, {
        all: true
    }, (err, allComments) => {
        if (err) { return lien.apiError(err); }
        lien.end(allComments);
    });
});

server.on("serverError", err => {
    console.error(err.stack);
});
