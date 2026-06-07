const http = require('http');
const { inject } = require('@vercel/analytics');

// Inject Vercel Analytics
inject();

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GEMINI</title>
    </head>
    <body>
      <h1>Welcome to GEMINI</h1>
      <p>This server is now configured with Vercel Web Analytics.</p>
    </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
