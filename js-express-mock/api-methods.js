module.exports = {
  apiMethods: (router) => {
    configJson = (req, res) =>
      res
        .status(200)
        .header("Accept", "application/json")
        .header("X-Requested-With", "XMLHttpRequest")
        .header("Access-Control-Allow-Origin", "http://localhost:4200")
        .header("Access-Control-Allow-Credentials", true)
        .header("Access-Control-Allow-Methods", "GET")
        .header(
          "Access-Control-Allow-Headers",
          "Authorization, Origin, X-Requested-With, Content-Type, Accept, Content-Type, Access-Control-Allow-Headers"
        )
        .header("Cache-Control", "no-cache")
        .header("Last-Modified", new Date().toUTCString())
        .json(require(`./config.json`));
    router.get("/list", configJson);
    router.post("/list", configJson);
  },
};
