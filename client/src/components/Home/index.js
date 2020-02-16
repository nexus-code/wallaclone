import { connect } from 'react-redux';
import { getUser } from '../../store/user/selectors';
import { getAdverts } from '../../store/adverts/selectors';
import { fetchAdverts } from '../../store/adverts/actions';

import Home from './Home';


// function mapStateToProps(state) {
//     return state;
// }


const mapStateToProps = (store, ownProps) => ({

    user: getUser(store),
    adverts: getAdverts(store),
});

const mapDispatchToProps = {
    loadAdverts: fetchAdverts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);