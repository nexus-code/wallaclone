import { connect } from 'react-redux';

import { getUser } from '../store/user/selectors';
import { setUser, login, recoverPasswd, resetPasswd, logout } from '../store/user/actions'

const mapStateToProps = (store, ownProps) => ({
    
        user: getUser(store),
        ownProps,
});

const mapDispatchToProps = {
    setUser,
    login,
    recoverPasswd,
    resetPasswd,
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);