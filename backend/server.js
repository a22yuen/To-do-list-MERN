require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

const listSchema = new mongoose.Schema({ name: String, items: [itemSchema] });
const List = mongoose.model("List", listSchema);

const item1 = new Item({ name: "Welcome to your To-do List!" });
const item2 = new Item({ name: "Hit + to add a new button" });
const item3 = new Item({ name: "<-- Hit this to delete an item" });

app.get("/", async function (req, res) {
  await Item.find({}, function (err, items) {
    if (err) {
      console.log("find" + err);
    }
    else if (items.length === 0) {
      item1.save();
      item2.save();
      item3.save(() => res.json(items));
    }
    else res.json(items);
  })
});

app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({ name: itemName });

  await item.save();
  res.json(item);

});

app.delete("/delete/:id", async function (req, res) {

  await Item.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log("delete" + err);
    } else {
      res.json({ message: "successfully deleted" });
    }
  });
}
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});