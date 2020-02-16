import React from 'react';
import { Link } from 'react-router-dom';
// import PageNotFound from '../assets/images/PageNotFound';
class NotFoundPage extends React.Component {
    render() {
        return <div style={{ textAlign: 'center', padding: '60px' }}>
            {/* <img src={PageNotFound} /> */}
            <h1>OPPs! 404</h1>
            <p>
                <Link to="/">Go to Home </Link>
            </p>
        </div>;
    }
}
export default NotFoundPage;