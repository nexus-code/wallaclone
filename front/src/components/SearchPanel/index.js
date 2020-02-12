import { connect } from 'react-redux';

import { getQuery, getTags } from '../../store/adverts/selectors';
import { adverQuerySet, adverQueryReset } from '../../store/adverts/actions';

import SearchPanel from './SearchPanel';


//No adverts stored
const mapStateToProps = (store, ownProps) => ({

    query: getQuery(store),
    tags: getTags(store),
});


const mapDispatchToProps = dispatch => ({
    adverQuerySet: (query) => dispatch(adverQuerySet(query)),
    adverQueryReset: () => dispatch(adverQueryReset()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPanel);
