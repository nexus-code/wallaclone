export function getAdverts(state) {
//    console.log('selector state', state)
    return state.adverts;
}

export const getAdvert = (adverts, id) => {

    //Improve this on store!!

    console.log('getAdvert', adverts);
    try{
        
        return adverts.filter(advert => advert.id === id)[0];
    }
    catch(err){
        
        return;// 'error? state.adverts.adverts';
    }
};