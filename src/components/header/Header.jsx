// Header.jsx
import '../header/Header.css'
import { IoSearchOutline } from "react-icons/io5";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";

const Header = ({ total, onSearch }) => {
  const [term, setTerm] = useState("");

  const runSearch = () => onSearch?.(term);

  const onKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div className='header'>
      <div className='container'>
        <h2 className='title'>Eteration</h2>

        <div className='search'>
          <input
            type="text"
            placeholder='Search'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <IoSearchOutline className='search-icon' onClick={runSearch} role="button" />
        </div>

        <ul className='right-header'>
          <li>
            <PiShoppingBagOpenDuotone className='header-icons'/>
            <span>{total.toFixed(2)}₺</span>
          </li>
          <li>
            <IoPersonOutline className='header-icons'/>
            <span>Kerem</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
