
import { connect } from 'react-redux';
import { fetchAds } from '../../store/ads/actions'

import Search from './Search';

const mapDispatchToProps = {
    loadAds: fetchAds,
};


function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);