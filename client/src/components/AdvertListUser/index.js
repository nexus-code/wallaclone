import { connect } from 'react-redux';
import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';

import AdvertListUser from './AdvertListUser';

const mapStateToProps = store => ({

    user: getUser(store),
    adverts: getAdverts(store),
});

export default connect(
    mapStateToProps,
    null,
)(AdvertListUser);
