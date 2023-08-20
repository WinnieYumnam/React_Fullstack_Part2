import React from 'react';
import Service from '../services/persons';

const Phonebook = ({ persons, setPersons }) => {
  const handleDelete = (id, name) => {
    const shouldDelete = window.confirm(`Delete ${name}?`);
    if(shouldDelete){
    Service.deleteNote (id)
      .then(() => {
        // On successful deletion, update the list of persons in the state        
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        // Handle error, e.g., show a message to the user
        console.error('Error deleting person:', error);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Phonebook;