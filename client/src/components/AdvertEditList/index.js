import { connect } from 'react-redux';
import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';

import AdvertEditList from './AdvertEditList';

const mapStateToProps = store => ({

    user: getUser(store),
    adverts: getAdverts(store),
});


export default connect(
    mapStateToProps,
    null,
)(AdvertEditList);
