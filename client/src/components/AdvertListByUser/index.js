import { connect } from 'react-redux';
import { fetchAdverts, advertQuerySet } from '../../store/adverts/actions';

import AdvertListByUser from './AdvertListByUser';

const mapDispatchToProps = dispatch => ({
    advertQuerySet: (query) => {
        dispatch(advertQuerySet(query));
        dispatch(fetchAdverts());
    }
});

export default connect(
    null,
    mapDispatchToProps,
)(AdvertListByUser);