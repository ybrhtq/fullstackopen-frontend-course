import Person from "./Person";

const Persons = ({ persons, handleRemovalOf }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>Phone number</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              handleRemoval={() => handleRemovalOf(person.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
