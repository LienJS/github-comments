const ctx = require("ctx")
    , GitHub = require("gh.js")
    ;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const server = new ctx()
    , ghCctxt = new GitHub(GITHUB_TOKEN)
    ;

server.addPage("/:owner/:name", ctx => {
    ghCctxt.get(`repos/${ctx.params.owner}/${ctx.params.name}/issues/comments`, {
        all: true
    }, (err, allComments) => {
        if (err) { return ctx.apiError(err); }
        ctx.end(allComments);
    });
});

server.on("serverError", err => {
    console.error(err.stack);
});
