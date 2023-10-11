const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Get the file path based on the URL
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found, respond with a 404 error
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        // Read the file and serve it as the response
        fs.readFile(filePath, (error, data) => {
            if (error) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    });
});

const port = 8000; // Specify your desired port number

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
