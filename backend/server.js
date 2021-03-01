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

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {

  Item.find({}, function (err, items) {

    if (items.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully added items");
        }
      });
      item1.save();
      item2.save();
      item3.save(() => res.json(items));
    }
    else res.json(items);
  })
});

app.post("/", function(req, res){
  console.log(req.body);
  const itemName = req.body.newItem;
  const item = new Item({ name: itemName });
  
  item.save();

});

// app.post("/:title", function(req,res){
//   List.findOne({name: listName}, function(err, foundList){
//     foundList.items.push(item);
//     foundList.save();
//     res.redirect("/" + listName);
//   })
// });

app.delete("/delete/:id", function (req, res) {

  Item.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
}
);

// app.delete("/:title/:key" , function(req,res){
//   List.findOneAndUpdate(
//     {name: listName},
//     {$pull: {items: {_id: checkedItemID}}},
//     function(err, foundList){
//       if(!err){
//         res.redirect("/" + listName);
//       }
//     }
//   );
// }


// app.get("/:title", function(req,res){
//   const newPage = _.capitalize(req.params.title);

//   List.findOne({name: newPage}, function(err, list){
//     if(!err){
//       if(!list){
//         const list = new List({
//           name: newPage,
//           items: defaultItems
//         });
//         list.save();
//         res.redirect("/" + newPage)
//       } else {
//         res.render("list", {listTitle: list.name, newListItems: list.items});
//       }
//     }
//   });
// });






const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});