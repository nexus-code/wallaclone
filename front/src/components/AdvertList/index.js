import { connect } from 'react-redux';

// import { getUser } from '../../store/user/selectors';
// import { getAdverts } from '../../store/adverts/selectors';
import { fetchMoreAdverts } from '../../store/adverts/actions';

import AdvertList from './AdvertList';

const mapStateToProps = (store) => ({
    user: store.user,
    adverts: store.adverts,
});


const mapDispatchToProps = dispatch => ({
    loadMoreAdverts: () => dispatch(fetchMoreAdverts()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvertList);
