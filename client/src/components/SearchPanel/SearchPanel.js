import React from 'react';

import './SearchPanel.css';

export default function SearchPanel({ query, tags, advertQuerySet, advertQueryReset }) {

  const types = ['sell', 'buy'];

  const handleChange = (event) => {

    const { name, value } = event.target;

    query = {
      ...query,
      [name]: value,
    }
    
    advertQuerySet(query);
  };

  const handleReset = (event) => advertQueryReset();    

   const handleSubmit = ev => {

    ev.preventDefault();
    advertQuerySet(query);
  };

  return <>
      <form className="SearchPanel" onSubmit={handleSubmit}>
      <div className="SearchPanel__Filters">
          <input name="name" placeholder="Product name" onChange={handleChange} value={query.name}></input>
          <select name="type" onChange={handleChange} defaultValue={query.type} >
              <option value="">Search & buy</option>
            {types &&
              types.map(type =>
                <option value={type}>{type}</option>
              )}
          </select>
          <select name="tag" onChange={handleChange} defaultValue={query.tag} >
            <option value="">All tags</option>
            {tags &&
              tags.map(tag => 
                <option value={tag}>{tag}</option>
              )}
          </select>
          
        <input name="priceFrom" placeholder="From price" onChange={handleChange} value={query.priceFrom}></input>
        <input name="priceTo" placeholder="To price" onChange={handleChange} value={query.priceTo}></input>
        </div>


        <div className="SearchPanel__Footer">
          <button type="reset" className="btn btn-outline-secondary" onClick={handleReset}>Reset</button>
          <button type="submit" className="btn btn-outline-primary">Search</button>
        </div>
      </form>
  </>
}
