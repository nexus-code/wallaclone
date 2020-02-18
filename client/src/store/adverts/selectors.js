// Mount the query string to send to the API
export const mountAdvertsQuery = query => {

    const { tag, name, type, priceFrom, priceTo, sort } = query;

    let queryString = '?sort=created'
    queryString += (tag !== '' && tag !== 'undefined' && tag !== undefined && tag !== 'all') ? `&tags=${tag}` : '';
    queryString += (name !== '' && name !== undefined) ? `&name=${name}` : '';
    queryString += (type !== '' && type !== undefined && type !== 'all') ? `&type=${type}` : '';

    let priceString = '&price=';
    priceString += (priceFrom !== '0' && priceFrom !== '' && priceFrom !== undefined) ? `${priceFrom}` : '0';
    priceString += (priceTo !== '0' && priceTo !== '' && priceTo !== undefined) ? `-${priceTo}` : '';

    queryString += (priceString !== '&price=0-0' && priceString !== '&price=0') ? priceString : '';

    return queryString;
}

// adverts from state
export const getAdverts = state => state.adverts;

// advert from state
export const getAdvert = (adverts, id) => {

    try{
        
        return adverts.filter(advert => advert.id === id)[0];
    }
    catch(err){
        
        return;// 'error? state.adverts.adverts';
    }
};

// query from state
export const getQuery = state => state.query;

// tags fromstate
export const getTags = state => state.tags;