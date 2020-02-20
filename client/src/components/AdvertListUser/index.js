import { connect } from 'react-redux';
import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import {  removeAdvert } from '../../store/adverts/actions';

import AdvertListUser from './AdvertListUser';

const mapStateToProps = store => ({

    user: getUser(store),
    adverts: getAdverts(store),
});

const mapDispatchToProps = dispatch => ({

    removeAdvert: (id) => dispatch(removeAdvert(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertListUser);
