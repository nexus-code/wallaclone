import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import { isUserLogged } from '../../store/user/selectors';

const mapStateToProps = state => ({
  authorized: isUserLogged(state),
});

export default connect(mapStateToProps)(PrivateRoute);
