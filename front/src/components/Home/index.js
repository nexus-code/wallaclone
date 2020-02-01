import { connect } from 'react-redux';
import { fetchAds } from '../../store/ads/actions';

import Home from './Home';

const mapDispatchToProps = {
    loadAds: fetchAds,
};


function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);