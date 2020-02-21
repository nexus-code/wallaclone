import { connect } from 'react-redux';
import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import { fetchAdverts, advertQuerySet, saveAdvert, removeAdvert } from '../../store/adverts/actions';

import AdvertEdit from './AdvertEdit';

const mapStateToProps = store => ({

    user: getUser(store),
    adverts: getAdverts(store),
})

const mapDispatchToProps = dispatch => ({
    
    advertQuerySet: query => {
        dispatch(advertQuerySet(query));
        dispatch(fetchAdverts());
    },
    saveAdvert: (advert, method) => dispatch(saveAdvert(advert, method)),
    loadAdverts: () => dispatch(fetchAdverts()),
    removeAdvert: id => dispatch(removeAdvert(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertEdit);