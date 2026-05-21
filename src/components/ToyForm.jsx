import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  // Store the form input values in state.
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    // Update the input that the user is typing in.
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // This is the toy we will send to the server.
    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    function addToyAndClearForm(toy) {
      // Add the new toy after the server saves it.
      onAddToy(toy);
      setFormData({
        name: "",
        image: "",
      });
    }

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((toy) => {
        addToyAndClearForm({ ...newToy, ...toy });
      })
      .catch(() => {
        // Add the toy locally if json-server is not running.
        addToyAndClearForm({ ...newToy, id: Date.now().toString() });
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
