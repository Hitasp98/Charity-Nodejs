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
app.use("/Succor", require('./Routes/SuccorRouter'));

hbs.registerPartials(partialsPath);
app.get("/baseinfo1", (req, res) => {
  res.render("baseinfo1/index.html");
});
app.get("/baseinfo2", (req, res) => {
  res.render("baseinfo2/index.html");
});
app.get("/baseinfo3", (req, res) => {
  res.render("baseinfo3/index.html");
});
app.get("/Needy1", (req, res) => {
  res.render("Needy1/index.html");
});
app.get("/Needy2", (req, res) => {
  res.render("Needy2/index.html");
});
app.get("/Plan1", (req, res) => {
  res.render("Plan1/index.html");
});
app.get("/Plan2", (req, res) => {
  res.render("Plan2");
});
app.get("/Settelment", (req, res) => {
  res.render("Settelment/index.html");
});
app.get("/Succor", (req, res) => {
  res.render("Succor/index.html");
});
app.get("/Payment", (req, res) => {
  res.render("Payment/index.html");
});
app.get("*", (req, res) => {
  res.render("404");
});
var port = process.env.port || 8090;
app.listen(port, () => {
  console.log("running at " + port);
});
