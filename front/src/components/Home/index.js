import { connect } from 'react-redux';
import { fetchAdverts } from '../../store/adverts/actions';

import Home from './Home';

const mapDispatchToProps = {
    loadAdverts: fetchAdverts,
};


function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);