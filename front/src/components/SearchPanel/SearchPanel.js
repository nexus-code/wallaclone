import { useSelector, useDispatch } from 'react-redux';
import React, { Component } from 'react';
/* Material UI */
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
/* Own modules */
/* Assets */
/* CSS */
import './SearchPanel.css';

/**
 * Main App
 */
export default function SearchPanel () {

  const query = {
      name: '',
      type: 'all',
      tag: 'all',
      priceFrom: 0,
      priceTo: 0,
  };

  const tags = [];

  /**
   * Cambio en alguno de los campo del formulario
   */
  const handleChange = name => event => {
    console.log(name);
    console.log(event);
    // this.setState(
    //   {
    //     [name]: event.target.value,
    //   },
    //   () => {
    //     // Los campos numérico NO quiero que lancen busqueda automática (salvo que estén en blanco).
    //     // Para el resto de campos la búsqueda se activa en cuanto el usuario modifica el formulario (mejor UX)
    //     if (
    //       !name.startsWith('price') ||
    //       (name.startsWith('price') && query[name] === '')
    //     ) {
    //       handleSearch(query);
    //     }
    //   },
    // );
  };

  /**
   * Reseteo el estado a los valores originales de búsqueda
   */
  const handleReset = () => {
    console.log('handleReset');

    // this.setState(
    //   {
    //     type: 'all',
    //     tag: 'all',
    //     priceFrom: null,
    //     priceTo: null,
    //   },
    //   () => {
    //     // Llamo a realizar la busqueda
    //     handleSearch(query);
    //   },
    // );
  };

  /**
   * Reseteo el estado a los valores originales de búsqueda
   */
  const handleSubmit = ev => {
    ev.preventDefault();
    console.log('handleSubmit');

    // handleSearch(query);
  };

  /**
   * Render
   */

    return <>
      <form className="SearchPanel" onSubmit={handleSubmit}>
        <div className="InputSearch">
          {/* <SearchIcon
            className={`InputSearch__Icon InputSearch__Icon--start ${
              query.focus ? 'InputSearch__Icon--focus' : ''
            }`}
          /> */}
          <input
            id="filter_name"
            name="name"
            type="text"
            value={query.name}
            onChange={handleChange('name')}
            className="InputSearch__Input"
            autoComplete="off"
            placeholder="Buscar productos por nombre"
          />
        </div>
        <div className="SearchPanel__Filters">
          <FormControl>
            <InputLabel shrink htmlFor="type">
              Tipo
            </InputLabel>
            <Select
              id="filter_type"
              name="type"
              onChange={handleChange('type')}
              className="SearchPanel__Type"
              value={query.type}
              displayEmpty
            >
              <MenuItem key="all" value="all">
                <Chip
                  size="small"
                  label="all"
                  className="Ad__Tag Ad__Tag--small"
                />
              </MenuItem>
              <MenuItem key="buy" value="buy">
                <Chip
                  size="small"
                  label="buy"
                  className="Ad__Tag Ad__Tag--small Ad__Tag--buy"
                />
              </MenuItem>
              <MenuItem key="sell" value="sell">
                <Chip
                  size="small"
                  label="sell"
                  className="Ad__Tag Ad__Tag--small Ad__Tag--sell"
                />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="tag">
              Tag
            </InputLabel>
            <Select
              id="filter_tag"
              name="tag"
              value={query.tag}
              onChange={handleChange('tag')}
              displayEmpty
            >
              <MenuItem key="all" value="all">
                <Chip
                  key="todos"
                  size="small"
                  label="todos"
                  className="Ad__Tag Ad__Tag--small"
                />
              </MenuItem>
              {tags &&
                tags.map((value, key) => {
                  return (
                    <MenuItem key={key} value={value}>
                      <Chip
                        key={key}
                        size="small"
                        label={value}
                        className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                      />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="priceFrom">Precio desde</InputLabel>
            <Input
              id="filter_priceFrom"
              name="priceFrom"
              type="number"
              value={parseInt(query.priceFrom) || 0}
              onChange={handleChange('priceFrom')}
              endAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="priceTo">Precio hasta</InputLabel>
            <Input
              id="filter_priceTo"
              name="priceTo"
              type="number"
              value={parseInt(query.priceTo) || 0}
              onChange={handleChange('priceTo')}
              endAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
          </FormControl>
        </div>
        <div className="SearchPanel__Footer">
          <Button type="submit" variant="contained" color="primary">
            {' '}
            Search{' '}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
          >
            {' '}
            Reset{' '}
          </Button>
        </div>
      </form>
    </>
}
