import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collapse from 'react-bootstrap/Collapse'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './SearchPanel.css';

export default function SearchPanel({ query, tags, advertQuerySet, advertQueryReset }) {


  const { t } = useTranslation();

  const tagsOptions = tags.map(tag => ({ label: tag, value: tag }));
  const [open, setOpen] = useState(false);
  const [selectTagsValue, setSelectTagsValuet] = useState();
  const [selectTagsOptions, setSelectTagsOptions] = useState(tagsOptions);
  const types = ['sell', 'buy'];

  const handleChange = (event) => {

    const { name, value } = event.target;

    query = {
      ...query,
      [name]: value,
    }
    
    advertQuerySet(query);
  };

  const handleReset = event => {

    setSelectTagsValuet(null);  // NOTE!!! component not work properly after reset form
    setSelectTagsOptions(tagsOptions);  
    advertQueryReset();    
  }

  const handleSubmit = ev => {

    ev.preventDefault();
    advertQuerySet(query);
  };

  // do search by tag
  const handleSelectChange = options => {

    if (!options)
      return

    const _tags = options.map(opt => opt.value);
    handleChange({target:{ name: 'tag', value: _tags}});
  }

  const animatedComponents = makeAnimated(); //for Select tags
  const reactSelectStyles = {
      control: styles => ({...styles,
        paddingTop: '10px', 
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderBottom: '1px solid rgba(0, 0, 0, .3)',
        outline: 'none',
        borderRadius: 0,
        color: 'black',
      }),
  }

  return <>
    <div className="searchButtonContainer">
      <button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>{t('Search')}</button>
    </div>
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
          <Select
            isMulti
            closeMenuOnSelect={true}
            styles={reactSelectStyles}
            components={animatedComponents}
            value={selectTagsValue}
            onChange={handleSelectChange}
            placeholder={t('All tags')}
            options={selectTagsOptions}
          />

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
