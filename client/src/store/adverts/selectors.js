export function getAdverts(state) {
    return state.adverts;
}

export const getAdvert = (adverts, id) => {

    //Improve this on store!!

    try{
        
        return adverts.filter(advert => advert.id === id)[0];
    }
    catch(err){
        
        return;// 'error? state.adverts.adverts';
    }
};

export function getQuery(state) {
    
    return state.query;
}

export function getTags(state) {
    return state.tags;
}
