const Filter = ({ filterValue, handleValueChange }) => {
  return (
    <div>
      find countries <input value={filterValue} onChange={handleValueChange} />
    </div>
  );
};

export default Filter;
