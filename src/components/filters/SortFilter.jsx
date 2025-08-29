import '../filters/filtersCss/SortFilter.css'

const SortFilter = ({ sortBy, onChange }) => {
  return (
    <div className='filter-container'>
      <h2 className="filter-title">Sort By</h2>
      <div className='filter-options'>
        <label>
          <input
            type="radio"
            name="Sorting"
            value="OldToNew"
            checked={sortBy === "OldToNew"}
            onChange={(e) => onChange(e.target.value)}
          />
          Old to New
        </label>

        <label>
          <input
            type="radio"
            name="Sorting"
            value="NewToOld"
            checked={sortBy === "NewToOld"}
            onChange={(e) => onChange(e.target.value)}
          />
          New to Old
        </label>

        <label>
          <input
            type="radio"
            name="Sorting"
            value="HighToLow"
            checked={sortBy === "HighToLow"}
            onChange={(e) => onChange(e.target.value)}
          />
          Price High to Low
        </label>

        <label>
          <input
            type="radio"
            name="Sorting"
            value="LowToHigh"
            checked={sortBy === "LowToHigh"}
            onChange={(e) => onChange(e.target.value)}
          />
          Price Low to High
        </label>
      </div>
    </div>
  );
};

export default SortFilter;
