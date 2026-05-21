import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  // Keep all toys in App so every component can share the same list.
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Load toys when the app first starts.
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toys) => setToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    // Add the toy returned from the server to our state.
    setToys((toys) => [...toys, newToy]);
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    });

    // Remove the donated toy from the page.
    setToys((toys) => toys.filter((toy) => toy.id !== id));
  }

  function handleUpdateToy(updatedToy) {
    // Replace the old toy with the updated toy.
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
