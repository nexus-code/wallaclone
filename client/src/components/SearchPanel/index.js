import { connect } from 'react-redux';
import { getQuery, getTags } from '../../store/adverts/selectors';
import { fetchAdverts, advertQuerySet, advertQueryReset } from '../../store/adverts/actions';

import SearchPanel from './SearchPanel';

/*
* Dispatch queries and fetch adverts
*/

const mapStateToProps = (store, ownProps) => ({
    query: getQuery(store),
    tags: getTags(store),
});


const mapDispatchToProps = dispatch => ({
    advertQuerySet: (query) => { 
        dispatch(advertQuerySet(query)); 
        dispatch(fetchAdverts())
    },
    advertQueryReset: () => {
        dispatch(advertQueryReset());
        dispatch(fetchAdverts());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPanel);
