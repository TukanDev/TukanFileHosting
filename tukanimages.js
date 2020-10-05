require('dotenv').config()
const express = require('express')
const signale = require('signale')
const chalk = require('chalk')
const clear = require('clear')
const files = require('./utils/files')
const handlePost = require('./utils/post')
const handleError = require('./utils/error')
const cfg = require('./config.json')
const tuki = express()

tuki.get('/', function(req, res) {
    res.send(`<html>
    <head>
    <meta name="theme-color" content="#36393e">
    <meta property="og:type" content="website">
    <meta property="og:title" content="TukanServices | ImageHosting - Home">
    <meta property="og:site_name" content="TukanServices | ImageHosting" />
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="TukanServices | ImageHosting">
    </head>
    <body>
    <title>TukanServices | ImageHosting - Home</title>
    <h1>i.tukandev.xyz</h1>
    <h3>ImageUploader & Hosting</h3>
    <h5>This is the homepage of TukanServices ImageHosting system! if you are here you probably thinked this has any homepage, sadly it doesnt!<br>
    You should probably enter correct file name after / if you dont wanna do that simply close the page.
    </h5>
    </body> 
    </html>`)
})
tuki.post('/upload', function(req, res) {
        handlePost(req, res, files).catch(handleError.bind(null, req, res));
})

tuki.get('/:url', function(req, res) {
    if (req.params.url != null || req.params.url != undefined) {
        let format = `<html>
        <head>
        <meta name="theme-color" content="#36393e">
        <meta property="og:url" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Open in browser">
        <meta property="og:site_name" content="TukanServices | ImageHosting" />
        <meta property="og:image" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="TukanServices | ImageHosting">
        <meta name="twitter:image" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">
        </head>
        <body>
        <img src="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}"></img>
        </body>
        </html>`
                res.send(format)
    } else {
        res.send(`We can not search for file named "${req.params.url}", try again later!`)
    }
})

let server = tuki.listen(process.env.PORT, `${process.env.HOST}`, () => {
    clear();
    console.log(" ");
    console.log(" ");
    console.log(chalk.bold("  TukanServices - ImageHosting"));
    console.log(" ");
    console.log(" ");
    console.log(chalk.grey("  (C) 2020, tukandev.xyz"));
    console.log(" ");
    console.log(" ");
    console.log(" ");
    signale.success(`Listening on ${server.address().address}:${server.address().port}`);
});