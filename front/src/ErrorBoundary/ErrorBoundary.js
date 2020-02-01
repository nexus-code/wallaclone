import React    from "react";
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    this.setState({ error });
  }
  
  render() {
    if (this.state.error) {
      return (
        <div>
            <h2>We're sorry - something's gone wrong.</h2>
            <p>
                <Link to="/">Go to Home </Link>
            </p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;