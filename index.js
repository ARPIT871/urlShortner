const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const path=require('path')
const app = express();
const PORT = 8001;


connectToMongoDB("mongodb+srv://arpit:arpit871@practisecluster.syx0dem.mongodb.net/new?retryWrites=true&w=majority").then(() =>
  console.log("Mongodb connected")
);
app.use(express.static('public'))
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url", urlRoute);
app.use("/", staticRoute);



app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
