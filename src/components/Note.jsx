const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  // Destructure the 'note' prop
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>

      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
};

export default Note;
