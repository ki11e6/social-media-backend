# Packages used

**express** -framework <br>
**typescript** -language <br>
**@types/express** -for types <br>
**@types/node** -for types <br>
**cors** -middleware that can be used to enable CORS with various options. <br>
**hpp** -protect against HTTP Parameter Pollution attacks <br>
**helmet** -helps secure Express apps by setting HTTP response headers. <br>
**cookie-session** -cookie-based session middleware.<br>
**express-async-errors** -simple ES6 async/await support hack for ExpressJS. for those where try catch cannot be used. <br>
**compression** -Node.js compression middleware, request are automatically compressed. <br>
**http-status-code** -HTTP status code middleware.help with code if not specified <br>
**ts-node** -is a TypeScript execution engine and REPL for Node.js. <br>
**tsconfig-paths** -Use this to load modules whose location is specified in the paths section of tsconfig.json i.e. when we change the absolute path<br>
**dotenv** -module that loads environment variables from a .env file into process.env. <br>
**mongoose** -middleware for mongodb connections. <br>
**@socket.io/redis-adapter** -Redis adapter for socket.io. <br>
**bunyan** -a simple and fast JSON logging library. <br>
**tsc-alias** -support custom transformers in the tsconfig.json. <br>
**typescript-transform-paths** -Transform compiled source module resolution paths using TypeScript's paths config, and/or custom resolution paths. <br>
**cloudinary** -for storing files in cloud.<br>
**joi** -for validating schemas. <br>

# hpp

<p>
The hpp package is an Express middleware that helps protect against HTTP Parameter Pollution (HPP) attacks. HPP attacks occur when an attacker manipulates the parameters of an HTTP request to exploit vulnerabilities in a web application. The hpp package helps prevent these attacks by checking the top-level parameters in req.query and req.body for arrays. If a parameter is an array, the array is moved to req.queryPolluted or req.bodyPolluted, and the first value of the array is assigned to req.query or req.body, respectively.
</p>

<a href="https://www.npmjs.com/package/hpp">**_link_**</a>

# helmet

<p>
Helmet is an open-source JavaScript library that helps you secure your Node.js application by setting several HTTP headers. It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards. Although not a silver bullet, Helmet makes it harder for attackers to exploit known vulnerabilities. It helps to protect Node.js Express apps from common security threats such as Cross-Site Scripting (XSS) and click-jacking attacks.

Helmet is particularly useful because Express applications do not come with security HTTP headers out of the box

</p>

<a href="https://www.npmjs.com/package/helmet">**_link_**</a>

# compression middleware

<p>
The compress middleware to compress the response bodies for all requests that traverse through the middleware.
The middleware is used to enable gzip compression. The middleware will attempt to compress response bodies for
all requests that traverse through the middleware, based on the given options. This middleware will never compress 
responses that include a Cache-Control header with the no-transform directive, as compressing will transform the body.
</p>

The benefits of using compression middleware are:

> Reduced network latency.<br>
> Reduced bandwidth usage.<br>
> Faster page load times.<br>
> Reduced server load.<br>

<a href="https://www.npmjs.com/package/compression">**_link_**</a>

# Bunyan middleware

check constructor api and cli

<a href="https://www.npmjs.com/package/bunyan">**_link_**</a>

# editorconfig

This plugin will help you configure the vscode indentations.

<a href="https://editorconfig.org/">**_link_**</a>

# tsc-alias

The tsc-alias package is a tool that replaces alias paths with relative paths after TypeScript compilation. This allows you to use TypeScript’s path mapping feature to define custom module resolution paths, and have those paths correctly resolved in the compiled output.

<a href="https://www.npmjs.com/package/tsc-alias">**_link_**</a>

# typescript-transform-paths

<p>
The typescript-transform-paths package is a plugin for TypeScript that transforms module resolution paths in the compiled output source to conform with TypeScript’s internal resolution via tsconfig.json settings (such as paths, rootDirs, and baseUrl). This allows you to use TypeScript’s path mapping feature to define custom module resolution paths, and have those paths correctly resolved in the compiled output.
</p>

<a href="https://www.npmjs.com/package/typescript-transform-paths">**_link_**</a>
