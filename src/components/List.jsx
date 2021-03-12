import React, { useState, useEffect } from 'react';
import Item from "./Item"
import axios from 'axios';

function List() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [changed, setChanged] = useState(false); 
  
  useEffect(() => {
    axios.get("http://localhost:5000/")
    .then(response => {
      setItems(response.data);
    })
    .catch(error => {
      console.log("effect" + error);
    })
  },[changed]);


  function deleteItem(id) {
    axios.delete('http://localhost:5000/delete/' + id)
      .then(response => { console.log(response.data) })
      .catch(err => {console.log("deleteItem" + err)})
    setItems(items.filter(item => item._id !== id));
  };

  function createItem() {
    axios.post('http://localhost:5000/', { newItem: newItem })
      .then(res => console.log(res.data))
    console.log("created item");
    setNewItem("");
    setTimeout(() => {changed ? setChanged(false) : setChanged(true)}, 100);
  }

  function taskList() {
    if(items.length === 0){
      return;
    }
    return items.map(currentItem => {
      return <Item itemName={currentItem.name} key={currentItem._id} id={currentItem._id} delete={deleteItem} />
    })
  };

  function change(e) {
    setNewItem(e.target.value);
  }

  return (
    <div>
      <div className="box" id="heading">
        <h1>Today</h1>
      </div>
      <div className="box itemList">
        {taskList()}
        <input type="text" name="newItem" onChange={change} value={newItem} placeholder="New Item" autoComplete="off" />
        <button className="new" onClick={createItem}>+</button>
      </div>
    </div>
  );
}

export default List;

