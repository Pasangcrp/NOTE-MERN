import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note"; // Fix the import statement

const App = () => {
  const [notes, setNotes] = useState([]); // Change variable name to "notes" for consistency
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const newNoteObj = {
      id: notes.length + 1,
      title: newNote,
      content: "",
      important: Math.random() > 0.5,
    };
    axios.post("http://localhost:3001/notes", newNoteObj).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((note) => id === note.id);
    const updatedNote = { ...note, important: !note.important };

    axios
      .put(url, updatedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id === id ? response.data : note)));
      })
      .catch((error) => {
        console.error("Error updating note importance: ", error);
      });
  };

  const deleteNote = (id) => {
    try {
      setNotes((prevNote) => prevNote.filter((note) => note.id !== id));

      const url = `http://localhost:3001/notes/${id}`;
      axios.delete(url).catch((err) => console.log(err));
    } catch (error) {
      console.log("Error deleting note", error);
    }
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button>Add</button>
      </form>

      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          deleteNote={() => deleteNote(note.id)}
        />
      ))}
    </div>
  );
};

export default App;
