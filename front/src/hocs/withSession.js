import { connect } from 'react-redux';

import { getUser } from '../store/user/selectors';
import { setUser, logout } from '../store/user/actions'

const mapStateToProps = (store, ownProps) => ({
    
        user: getUser(store),
        ownProps,
});

const mapDispatchToProps = {
    setUser,
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);