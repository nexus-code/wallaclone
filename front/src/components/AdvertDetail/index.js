import { connect } from 'react-redux';

import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import { fetchAdvert, removeAdvert } from '../../store/adverts/actions';

import AdvertDetail from './AdvertDetail';

const mapStateToProps = (store, ownProps) => ({

    user: getUser(store),
    adverts: getAdverts(store),
});

const mapDispatchToProps = dispatch => ({
    
    loadAdvert: (id) => dispatch(fetchAdvert(id)),
    removeAdvert: (id) => dispatch(removeAdvert(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertDetail);