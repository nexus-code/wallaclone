
import { connect } from 'react-redux';
import { fetchAdverts } from '../../store/adverts/actions'

import Search from './Search';

const mapDispatchToProps = {
    loadadverts: fetchAdverts,
};


function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);