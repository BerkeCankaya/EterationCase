import '../filters/filtersCss/BrandFilter.css'
import { IoSearchOutline } from "react-icons/io5";
import { useState } from 'react';

const BrandFilter = ({ products, onBrandChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    let updated = [...selectedBrands];

    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((b) => b !== value);
    }

    setSelectedBrands(updated);
    onBrandChange(updated);
  };

  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className='brand-filter-container'>
      <h2 className="filter-title">Brand</h2>
      <div className='filter-search'>
        <input type="text" placeholder='Search' />
        <IoSearchOutline className='search-icon'/>
      </div>
      <div className='brand-filter-options'>
        {brands.map((brand) => (
          <label key={brand}>
            <input 
              type="checkbox" 
              value={brand} 
              onChange={handleCheckbox}
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  )
}

export default BrandFilter;
