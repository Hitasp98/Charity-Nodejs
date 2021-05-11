var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");

const viewPath = path.join(__dirname, "./View");
const partialsPath = path.join(__dirname, "./View");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./view/"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", viewPath);

app.use("/CommonBaseType", require("./Routes/commonBaseTypeRoutes"));
app.use("/CommonBaseData", require("./Routes/commonBaseDataRoutes"));
app.use("/CharityAccounts", require("./Routes/charityAccountsRoutes"));
app.use("/Personal", require("./Routes/personalRoutes"));
app.use("/NeedyAccounts", require("./Routes/NeedyAccountsRoutes"));
app.use("/FirstPlan", require("./Routes/FirstPlanRouter"));
app.use("/SecondPlan", require("./Routes/SecondPlanRouter"));
app.use("/Settelment", require("./Routes/SettelmentRoutes"));
app.use("/Payment", require("./Routes/PaymentRoutes"));

hbs.registerPartials(partialsPath);
app.get("/info12", (req, res) => {
  res.render("baseinfo12");
});
app.get("/info3", (req, res) => {
  res.render("baseinfo3");
});
app.get("/needy1", (req, res) => {
  res.render("needy1");
});
app.get("/needy2", (req, res) => {
  res.render("needy2");
});
app.get("/FirstPlan", (req, res) => {
  res.render("Plan1");
});
app.get("/SecondPlan", (req, res) => {
  res.render("Plan2");
});
app.get("/Settelment", (req, res) => {
  res.render("Settelment");
});
app.get("/Succor", (req, res) => {
  res.render("Succor");
});
app.get("/Payment", (req, res) => {
  res.render("Payment");
});
app.get("*", (req, res) => {
  res.render("404");
});
var port = process.env.port || 8090;
app.listen(port, () => {
  console.log("running at " + port);
});
