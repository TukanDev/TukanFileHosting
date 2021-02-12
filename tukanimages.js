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

tuki.use("/raw", express.static("files"))

tuki.get('/', function(req, res) {
    res.send(`<html>
    <head>
    <meta name="theme-color" content="#36393e">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${cfg.general.name} | ${cfg.general.title}">
    <meta property="og:site_name" content="${cfg.general.name} | ${cfg.general.title}" />
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${cfg.general.name} | ${cfg.general.title}">
    </head>
    <body>
    <title>${cfg.general.name} | ${cfg.general.title}</title>
    <h1>${cfg.general.name}</h1>
    <h3>File Storage</h3>
    <h5>This is the homepage of ${cfg.general.name} ${cfg.general.title.replace("- Home", "")} system! if you are here you probably think this has any homepage, sadly it doesnt!<br>
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
		let rformat = req.params.url.split(".")
		let formatbody = ``
		let metah = ``
		let htitle = ``
		let projectn = ``
		
		switch(rformat[1]) {
		case "mp4":
			formatbody = `<video controls="" autoplay="" name="media"><source src="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}" type="video/mp4"></video>`
			metah = `<meta property="og:video" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">`
		    projectn = `${cfg.lang.videoh}`
		    htitle = `${cfg.lang.wib}`
			break;
		case "png":
			formatbody = `<img src="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}"></img>`
			metah = `<meta property="og:image" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">`
			projectn = `${cfg.lang.imgh}`
			htitle = `${cfg.lang.oib}`
			break;
		case "jpg":
			formatbody = `<img src="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}"></img>`
			metah = `<meta property="og:image" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">`
		    projectn = `${cfg.lang.imgh}`
		    htitle = `${cfg.lang.oib}`
			break;
		case "zip" || "txt" || "rar" || "tar" || "gz" || "docx" || "doc" || "js" || "java" || "class" || "ejs" || "css" || "scss" || "html" || "php":
			formatbody = `<a href="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">Download file</a>`
			metah = `<meta http-equiv="Refresh" content="0; url='${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}'" />`
		    projectn = `${cfg.lang.fileh}`
		    htitle = `${cfg.lang.downl}`
			break;
		default:
			formatbody = `<img src="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}"></img>`
			metah = `<meta property="og:image" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">`
		    projectn = `${cfg.lang.imgh}`
		    htitle = `${cfg.lang.oib}`
			break;
		}
        let format = `<html>
        <head>
        <meta name="theme-color" content="${cfg.general.color}">
        <meta property="og:url" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">
        <meta property="og:type" content="website">
        <meta property="og:title" content="${htitle}">
        <meta property="og:site_name" content="${cfg.general.name} | ${projectn}" />
        ${metah}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${cfg.general.name} | ${projectn}">
        <meta name="twitter:image" content="${cfg.proxy.url}${cfg.proxy.dir}${req.params.url}">
        </head>
        <body>
        ${formatbody}
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
    console.log(chalk.bold(`  ${cfg.general.name} - ${cfg.general.title.replace("- Home", "")}`));
    console.log(" ");
    console.log(" ");
    console.log(chalk.grey("  (C) 2020, tukandev.xyz"));
    console.log(" ");
    console.log(" ");
    console.log(" ");
    signale.success(`Listening on ${server.address().address}:${server.address().port}`);
});
