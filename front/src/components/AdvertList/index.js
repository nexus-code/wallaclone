import { connect } from 'react-redux';

import { getUser } from '../../store/user/selectors';
import { getAdverts, getQuery } from '../../store/adverts/selectors';
import { fetchAdverts, fetchMoreAdverts } from '../../store/adverts/actions';

import AdvertList from './AdvertList';


//No adverts stored
const mapStateToProps = (store, ownProps) => ({

    user: getUser(store),
    adverts: getAdverts(store),
});


const mapDispatchToProps = dispatch => ({
    loadAdverts: () => dispatch(fetchAdverts()),
    loadMoreAdverts: () => dispatch(fetchMoreAdverts()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertList);
