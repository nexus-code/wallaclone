import { adverts } from './reducers';
import * as TYPES from './types';

describe('adverts reducers', () => {

  const advertsList = [
    { id: "5e19a0db2ab1b61184740c44", name: "PS4Pro", description: "Compro PS4 Pro con menos de 1 año de uso", price: 200.99, type: "buy", photo: ""},
    { id: "5e19a0db2ab1b61184740c45", name: "XBOX OneX", description: "Vendo XBOX One X como nueva. No tengo tiempo para jugar.", price: 170.05, type: "sell", photo: ""},
    { id: "5e19a0db2ab1b61184740c46", name: "Raton Gaming Razer Mamba", description: "El mejor ratón gamer del mercado. Como nuevo (1 año)", price: 35.5, type: "sell", photo: ""},
    { id: "5e19a0db2ab1b61184740c47", name: "Teclado Gaming Razer Chroma", description: "Busco teclado razer en buen estado.", price: 70, type: "buy", photo: ""},
    { id: "5e19a0db2ab1b61184740c48", name: "Gráfica Gaming 1080ti", description: "Todavía una bestia parda en el 2k.", price: 400, type: "buy", photo: ""},
    { id: "5e19a0db2ab1b61184740c49", name: "PC Gaming (i7 6700K)", description: "Acabo de tener un hijo... se me acabo el gaming :)", price: 700, type: "sell", photo: ""},
  ];

  const initialState = {
    user: {},
    adverts: [],
    lastAction: {},
  };

  it('send dummy_action: should return the initial state', () => {
    const action = { type: 'dummy_action' };

    expect(adverts(initialState, action)).toEqual(initialState);
  })

  it('send TYPES.ADVERTS_FETCH_SUCCESS: should return advertsList', () => {

    const action = {
      type: TYPES.ADVERTS_FETCH_SUCCESS, 
      adverts: advertsList,
    };

    expect(adverts(initialState, action)).toEqual(advertsList)
  })

  it('send TYPES.ADVERT_SAVE_SUCCESS new ad: should return [ad]', () => {

    const ad = { name: "new Advert", description: "new advert for testing", price: 1.99, type: "buy", photo: ""};
    const action = {
      type: TYPES.ADVERT_SAVE_SUCCESS,
      ad,
    };

    expect(adverts(initialState, action)).toEqual([ad])
  })

  // // Revisar
  // it('send TYPES.ADVERT_SAVE_SUCCESS modify ad: should return [modified adList]', () => {

  //   const __initialState = {
  //     user: {},
  //     adverts: {
  //       adverts: adsList
  //     },
  //     lastAction: {},
  //   };

  //   const adModified = { id: "5e19a0db2ab1b61184740c44", name: "PS4Pro MODIFIED", description: "Compro PS4 Pro con menos de 1 año de uso", price: 100.99, type: "buy", photo: "" };

  //   const action = {
  //     type: TYPES.ADVERT_SAVE_SUCCESS,
  //     ad: adModified,
  //   };

  //   const expected = adsList.map(ad => ad.id === adModified.id ? adModified : ad);


  //   console.log('__initialState', __initialState);
  //   console.log('expected', expected);
  //   console.log('action', action);

  //   expect(ads(__initialState, action)).toEqual(expected);
  // });

});
