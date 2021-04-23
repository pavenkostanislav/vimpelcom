var express = require("express");
const app = express();
const apiRouter = require("./api-router");

app.options("/api/list", (req, res) =>
  res
    .status(200)
    .header("Accept", "application/json")
    .header("X-Requested-With", "XMLHttpRequest")
    .header("Access-Control-Allow-Origin", "http://localhost:4200")
    .header("Access-Control-Allow-Credentials", true)
    .header("Access-Control-Allow-Methods", "GET")
    .header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers,responseType"
    )
    .send("ok")
);

app.use("/api/", apiRouter);

var http = require("http").createServer(app);
http.listen(3000, function () {
  console.log(`Server running at http://${http.address().address}:3000/`);
});
