import Notification from "./components/Notification";
import personService from "./services/persons";
import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notificationText, setNotificationText] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleNameFilterChange = (event) => setNameFilter(event.target.value);

  const displayNotification = (message, type) => {
    setNotificationText(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationText(null);
      setNotificationType(null);
    }, 5000);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson !== undefined) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...foundPerson, number: newNumber };
        personService
          .update(foundPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === foundPerson.id ? returnedPerson : person
              )
            );
            displayNotification(`Updated phone number for ${newName}`, "info");
          })
          .catch((error) => {
            console.log(error);
            displayNotification(`${newName} is deleted from server`, "error");
            setPersons(
              persons.filter((person) => person.id !== foundPerson.id)
            );
          });
        setNewName("");
        setNewNumber("");
      }
    } else {
      const newPersonObject = { name: newName, number: newNumber };
      personService
        .create(newPersonObject)
        .then((createdPerson) => setPersons(persons.concat(createdPerson)));
      setNewName("");
      setNewNumber("");
      displayNotification(`Added ${newName}`, "info");
    }
  };

  const handleRemovalOf = (id) => {
    const personName = persons.find((person) => person.id === id).name;
    if (!confirm(`Do you really want to delete person ${personName}?`)) {
      return;
    }
    console.log(`trying to remove person ${id}`);
    personService
      .remove(id)
      .then(() => {
        displayNotification(`Successfully deleted ${personName}`, "info");
      })
      .catch((error) => {
        console.log(error);
        displayNotification(
          `Person ${personName} was already deleted from server`,
          "error"
        );
      });
    setPersons(persons.filter((person) => person.id !== id));
  };

  const personsShown = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationText} type={notificationType} />
      <Filter
        filterValue={nameFilter}
        handleValueChange={handleNameFilterChange}
      />
      <h2>Add a new one</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsShown} handleRemovalOf={handleRemovalOf} />
    </div>
  );
};

export default App;
