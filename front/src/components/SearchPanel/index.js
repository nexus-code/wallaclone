import { connect } from 'react-redux';

import { getQuery, getTags } from '../../store/adverts/selectors';
import { advertQuerySet, advertQueryReset } from '../../store/adverts/actions';

import SearchPanel from './SearchPanel';


//No adverts stored
const mapStateToProps = (store, ownProps) => ({

    query: getQuery(store),
    tags: getTags(store),
});


const mapDispatchToProps = dispatch => ({
    advertQuerySet: (query) => dispatch(advertQuerySet(query)),
    advertQueryReset: () => dispatch(advertQueryReset()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPanel);
