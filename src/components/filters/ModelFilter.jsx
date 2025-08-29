import '../filters/filtersCss/ModelFilter.css'
import { IoSearchOutline } from "react-icons/io5";
import { useMemo, useState, useEffect } from 'react';

const ModelFilter = ({ products, selectedBrands, selectedModels, onModelChange }) => {
  const [query, setQuery] = useState("");

  const models = useMemo(() => {
    const brandModel = selectedBrands.length > 0
      ? products.filter(p => selectedBrands.includes(p.brand))
      : [];
    const uniq = [...new Set(brandModel.map(p => p.model))];
    if (!query) return uniq;
    const lowerUniq = query.toLowerCase();
    return uniq.filter(m => String(m).toLowerCase().includes(lowerUniq ));
  }, [products, selectedBrands, query]);

  const showDisabled = selectedBrands.length === 0;

  const toggleModel = (model, checked) => {
    if (checked) {
      onModelChange([...new Set([...selectedModels, model])]);
    } else {
      onModelChange(selectedModels.filter(m => m !== model));
    }
  };

  useEffect(() => {
    if (showDisabled && query) setQuery("");
  }, [showDisabled, query]);

  return (
    <div className='filter-container'>
      <h2 className="filter-title">Model</h2>

      <div className='filter-search'>
        <input
          type="text"
          placeholder='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={showDisabled}
        />
        <IoSearchOutline className='search-icon'/>
      </div>

      <div className='model-filter-options'>
        {showDisabled ? (
          <p className="hint">Önce marka seçin.</p>
        ) : models.length === 0 ? (
          <p className="hint">Model bulunamadı.</p>
        ) : (
          models.map((model) => (
            <label key={model}>
              <input
                type="checkbox"
                checked={selectedModels.includes(model)}
                onChange={(e) => toggleModel(model, e.target.checked)}
              />
              {model}
            </label>
          ))
        )}
      </div>
    </div>
  );
};

export default ModelFilter;
