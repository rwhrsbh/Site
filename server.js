// const fs = require("fs");
// const http = require("http");

// const hostname = "10.242.5.204";
// const port = 3000;
// let data = [];

// const server = http.createServer((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     res.end();
//     return;
//   }

//   if (req.method === "POST") {
//     let body = "";

//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       try {
//         const data = JSON.parse(body);

//         let existingData = [];
//         if (fs.existsSync("users.json")) {
//           existingData = JSON.parse(fs.readFileSync("users.json"));
//         }

//         existingData.push(data);

//         // Сохраняем обновленный массив в файл
//         fs.writeFileSync("users.json", JSON.stringify(existingData, null, 2));

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: "Data received and saved" }));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON" }));
//       }
//     });
//   } else {
//     res.writeHead(405, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Only POST method is supported" }));
//   }
// });

// server.listen(port, hostname, () => {
//   console.log("Server running at http://" + hostname + ":" + port + "/");
// });

const fs = require("fs");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const requestData = JSON.parse(body);

        if (fs.existsSync("users.json")) {
          const users = JSON.parse(fs.readFileSync("users.json"));
          const user = users.find(
            (u) =>
              u.username === requestData.username &&
              u.password === requestData.password
          );

          if (user) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: true,
                message: "Authentication successful",
              })
            );
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                message: "Invalid username or password",
              })
            );
          }
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ success: false, message: "User data not found" })
          );
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Only POST method is supported",
      })
    );
  }
});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});
