const Filter = ({ filterValue, handleValueChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterValue} onChange={handleValueChange} />
    </div>
  );
};

export default Filter;
