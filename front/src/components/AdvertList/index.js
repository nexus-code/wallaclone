import { connect } from 'react-redux';

import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import { fetchAdverts, fetchMoreAdverts } from '../../store/adverts/actions';

import AdvertList from './AdvertList';


//No adverts stored
const mapStateToProps = (store, ownProps) => ({

    user: getUser(store),
    adverts: getAdverts(store),
});


const mapDispatchToProps = dispatch => ({
    loadAdverts: (query) => dispatch(fetchAdverts(query)),
    loadMoreAdverts: (query) => dispatch(fetchMoreAdverts(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertList);
