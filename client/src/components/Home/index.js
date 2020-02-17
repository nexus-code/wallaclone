import { connect } from 'react-redux';
import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import { fetchAdverts } from '../../store/adverts/actions';

import Home from './Home';

const mapStateToProps = (store, ownProps) => ({

    user: getUser(store),
    adverts: getAdverts(store),
});

const mapDispatchToProps = dispatch => ({
    loadAdverts: () => dispatch(fetchAdverts()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);