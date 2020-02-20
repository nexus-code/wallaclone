import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collapse from 'react-bootstrap/Collapse'

import './SearchPanel.css';

export default function SearchPanel({ query, tags, advertQuerySet, advertQueryReset }) {


  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
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
    <button className="searchButton" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>{t('Search')}</button>
    <Collapse className="searchCollapse" in={open}>
      <form className="searchPanel" onSubmit={handleSubmit}>
      <div className="searchPanelFilters">
          <h2>{t('Search adverts')}</h2>
          <input name="name" placeholder={t('Product name')} onChange={handleChange} value={query.name}></input>

          <select name="type" onChange={handleChange} defaultValue={query.type} >
            <option value="">{t('Sell & buy')}</option>
            {types &&
              types.map(type =>
                <option value={type} key={type}>{t(type)}</option>
              )}
          </select>
          <select name="tag" onChange={handleChange} defaultValue={query.tag} >
            <option value="">{t('All tags')}</option>
            {tags &&
              tags.map(tag => 
                <option value={tag} key={tag}>{t(tag)}</option>
              )}
          </select>

          <input name="priceFrom" placeholder={t('From price')} onChange={handleChange} value={query.priceFrom}></input>
        <input name="priceTo" placeholder={t('To price')} onChange={handleChange} value={query.priceTo}></input>
      </div>


        <div className="searchPanelFooter">
          <button type="reset" className="btn btn-outline-secondary" onClick={handleReset}>Reset</button>
          <button type="submit" className="btn btn-outline-primary">{t('Search')}</button>
        </div>
      </form>
    </Collapse>

  </>
}
