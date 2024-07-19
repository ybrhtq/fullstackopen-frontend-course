const Person = ({ person, handleRemoval }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={handleRemoval}>delete</button>
      </td>
    </tr>
  );
};

export default Person;
