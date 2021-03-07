import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import List from "./components/List";
import itemList from "./components/itemList";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={List} />
        {/* <Route path="/:listName" component={itemList()} /> */}
      </Router>
      <Footer />
    </div>
  );
}

export default App;
