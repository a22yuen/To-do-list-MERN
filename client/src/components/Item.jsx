import React from "react";

function Item(props) {

  function handleClick() {
    props.delete(props.id);
  }

  return (
    <div className="itemList">
      <div className="item">
         <button className="delete" onClick={handleClick}/>
         <p>{props.itemName}</p>
      </div>
    </div>
  );
}

export default Item;

