export function getAdverts(state) {
    // console.log('selector state', state)
    return state.adverts;
}

export const getAdvert = (props, id) => {

    //Improve this on store!!

    try{
        
        return props.adverts.filter(advert => advert.id === id)[0];
    }
    catch(err){
        
        return 'error? props.adverts.adverts';
    }
};