export function getAds(state) {

    return state.ads;//.ads;
}


export const getAd = (props, id) => {

    //Improve this on store!!

    try{
        
        return props.ads.filter(ad => ad.id === id)[0];
    }
    catch(err){
        
        // console.log('getAd props.ads.ads', props.ads.ads);
        return 'error? props.ads.ads'; //.filter(ad => ad.id === id)[0];
    }

};