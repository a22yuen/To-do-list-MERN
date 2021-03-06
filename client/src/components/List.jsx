import React, { useState, useEffect } from 'react';
import Item from "./Item"
import axios from 'axios';

function List() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const url = "https://to-do-list-backend-api.herokuapp.com/";

  useEffect(async () => {  
    const { data } = await axios.get(url);
    setItems(data);
  }, []);

  useEffect(() => {
    setNewItem("");
  }, [items]);

  const deleteItem = async (id) => {
    await axios.delete(`${url}delete/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  const createItem = async () => {
    console.log("clicked");
    const { data } = await axios.post(url, { newItem: newItem });
    setItems([...items, data]);
  }

  function taskList() {
    if (items.length === 0) {
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

