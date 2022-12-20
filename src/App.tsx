import React, { useState } from "react";
import Bar from "./components/Bar";
import ItemContainer from "./components/ItemContainer";
import { Item } from "./interface";
import "./index.css";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [search, setSearch] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  

  return (
    <>
      <VideoPlayer selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <Bar setSearch={setSearch} />
      <div className="parent">
        {search.length > 0 && search.map((item: Item, index) => (
          <ItemContainer key={index} item={item} setSelectedItem={setSelectedItem} />
        ))}
      </div>
    </>
  );
}

export default App;
