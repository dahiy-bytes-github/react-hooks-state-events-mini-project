import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import { CATEGORIES, TASKS } from "../data";
import { v4 as uuidv4 } from "uuid";

function App() {
  // Add ids to tasks
  const dataWithIds = TASKS.map((item) => ({ ...item, id: uuidv4() }));

  const [filteredTasks, setFilteredTasks] = useState(dataWithIds);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle task deletion
  function handleDelete(id) {
    const updatedTasks = filteredTasks.filter((task) => task.id !== id);
    setFilteredTasks(updatedTasks);
  }

  // Handle category change
  function handleCategoryChange(category) {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredTasks(dataWithIds); // Show all tasks
    } else {
      const updatedCategory = dataWithIds.filter(
        (task) => task.category === category
      );
      setFilteredTasks(updatedCategory);
    }
  }

  // Handle new task form submission
  function handleTaskFormSubmit(newTask) {
    setFilteredTasks((prevTasks) => [...prevTasks, newTask]);
  }

  return (
    <div className="App">
      <h2>My tasks</h2>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={handleTaskFormSubmit} />
      <TaskList tasks={filteredTasks} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
