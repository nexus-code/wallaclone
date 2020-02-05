import { connect } from 'react-redux';

import { getUser } from '../store/user/selectors';
import { setUser, login, logout } from '../store/user/actions'

const mapStateToProps = (store, ownProps) => ({
    
        user: getUser(store),
        ownProps,
});

const mapDispatchToProps = {
    setUser,
    login,
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);