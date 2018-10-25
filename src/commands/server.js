'use strict';

const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const path = require(`path`);

const MAX_PORT = 49151;
const MIN_PORT = 1024;
const HOSTNAME = `127.0.0.1`;
const PORT = 3000;
const SERVER_COMMAND = `--server`;
const CONTENT_TYPE = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'png': `image/png`,
  'gif': `image/gif`,
  'svg': `image/svg+xml`,
  'ico': `image/x-icon`
};

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const printDirectory = (pathURL, relativePath, files) => {
  relativePath = relativePath === `/` ? `` : relativePath;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Static</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${relativePath}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};
const checkPort = (port) => {
  if (port >= MIN_PORT && port <= MAX_PORT) {
    return port;
  } else if (port !== PORT) {
    console.log(`Введен неправидьный порт ${port}`);
  }
  return PORT;
};
const readFile = async (pathFile, res) => {
  const data = await readfile(pathFile);
  const content = CONTENT_TYPE[path.extname(pathFile).replace(`.`, ``)];
  const contentType = content ? content : `text/plain`;
  res.setHeader(`content-type`, contentType);
  res.end(data);
};


const readDir = async (pathDir, relativePath, res) => {
  const files = await readdir(pathDir);
  res.setHeader(`content-type`, `text/html`);
  res.end(printDirectory(pathDir, relativePath, files));
};

const server = http.createServer((req, res) => {

  const localPath = url.parse(req.url).pathname;
  const absolutePath = path.resolve(`static`, `${localPath.replace(`/`, ``)}`);

  (async () => {
    try {
      const pathStat = await stat(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, localPath, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

module.exports = {
  name: SERVER_COMMAND,
  description: `запускает сервер`,
  execute(command, port = PORT) {
    port = checkPort(port);
    server.listen(port, HOSTNAME, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Сервер запущен http://${HOSTNAME}:${port}`);
    });
  }
};
