import { connect } from 'react-redux';

import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import { saveAdvert, fetchAdvert } from '../../store/adverts/actions';

import AdvertEdit from './AdvertEdit';

const mapStateToProps = (store, ownProps) => ({

    user: getUser(store),
    adverts: getAdverts(store),
})

const mapDispatchToProps = dispatch => ({
    
    saveAdvert: (advert, method) => dispatch(saveAdvert(advert, method)),
    loadAdvert: (id) => dispatch(fetchAdvert(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertEdit);