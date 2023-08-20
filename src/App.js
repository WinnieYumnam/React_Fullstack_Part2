import { useState, useEffect } from 'react'
import Phonebook from './component/Phonebook'
import Service from './services/persons'
import Notification from './component/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const messageElement = document.getElementById('message');

  useEffect(() => {
    console.log('effect')
    Service
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setPersons(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    console.log('inside addNote component', event.target) 
    console.log("newName: ",newName)
    console.log("newNumber: ",newNumber) 
    const existingPersonCheck =  persons.find(person => person.name === newName)
    if(existingPersonCheck)   
      if(existingPersonCheck.number === newNumber){
        window.alert(`${newName} is already added to phonebook`) 
        setNewName('') 
        setNewNumber('')  
      } 
      else{
        window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
        console.log("existingPersonCheck.id",existingPersonCheck.id);
        const newObject = {
          id: existingPersonCheck.id,
          name: newName,
          number: newNumber,
          important: existingPersonCheck.important,      
        } 
        Service
        .update(existingPersonCheck.id,newObject)
        .then(returnedNote =>setPersons(persons.map(person => person.id !== existingPersonCheck.id ? person : returnedNote))) 
        .catch(error => {
          if(messageElement){
            messageElement.style.color = 'red';
            setErrorMessage(
              `Information of '${newName}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        })
        setNewName('')
        setNewNumber('')                          
      }
    else{
      const noteObject = {
        id: persons.id + 1,
        name: newName,
        number: newNumber,
        important: Math.random() < 0.5,      
      }    
      Service
        .create(noteObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')  
          setNewNumber('') 
          if(messageElement){
            messageElement.style.color = 'green';
            setSuccessMessage(`Added ${newName}`) 
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000) 
          }        
        })
    }                         
  }
  const handleNameChange = (event) => {   
    console.log(event.target.value)
    setNewName(event.target.value)     
  }  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log("inside handleSearch",event.target.value)
    setSearch(event.target.value) 
    let searchValue = search.toLowerCase()
    const display = persons.filter(person => {
      let temp = person.name.toLowerCase()
      return temp.includes(searchValue)
    })
    setPersons(display);    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notification message={errorMessage} />
      <p>Filter shown with: <input value={search} onChange={handleSearch} /></p>
      <form  onSubmit={addNote}>
      <h2>Add a new</h2>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange} /></p>
          <p>number: <input value={newNumber} onChange={handleNumberChange} /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App