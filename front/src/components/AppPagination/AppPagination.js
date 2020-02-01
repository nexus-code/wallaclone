import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { Pagination } from 'react-bootstrap';

// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1
// last input on https://github.com/react-bootstrap/react-bootstrap/issues/3281

class AppPagination extends React.Component {
    

    constructor(props) {
        super(props)

        this.state = {
            pages: parseInt(this.props.pages),
            currentPage: parseInt(this.props.currentPage)
        };

        // <<, <, > y >> cuases undefined. find out why?
        this.pageChanged  = this.pageChanged.bind(this);
        this.gotoFirst    = this.gotoFirst.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext     = this.gotoNext.bind(this);
        this.gotoLast     = this.gotoLast.bind(this);
    }

    goTo(index){

        this.setState({ pages: this.state.pages, currentPage: index });
        
        const path = `${this.props.location.pathname}?page=${index}`;
        this.props.history.push(path);
    } 

    gotoFirst(){

        this.goTo(1);
    }

    gotoPrevious() {

        const { currentPage } = this.state;
        const index = currentPage === 1 ? 1 : currentPage - 1;
        this.goTo(index);
    }

    gotoNext() {

        const { pages, currentPage } = this.state;
        const index = currentPage === pages ? pages : currentPage + 1;
        this.goTo(index);        
    }

    gotoLast() {
        
        this.goTo(this.state.pages);
    }


    pageChanged(event) {
        
        this.goTo(parseInt(event.target.text));
    }
   
    render() {

        const { pages, currentPage } = this.state;

        if ( pages === 0 ) return(<></>);   //end if not pages specificated
         

        let items = [];
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={ number } active={ number === currentPage }  onClick={this.pageChanged}>
                    {number}
                </Pagination.Item>,
            );
        }        

        return (

            <div className='container'>
                <br />
                <Pagination size="lg">
                    <Pagination.First disabled={currentPage === 1} onClick={ this.gotoFirst }/>
                    <Pagination.Prev disabled={ currentPage === 1 } onClick={ this.gotoPrevious } />
                    { items }
                    <Pagination.Next disabled={ currentPage === pages }  onClick={ this.gotoNext } />
                    <Pagination.Last disabled={ currentPage === pages } onClick={ this.gotoLast } />
                </Pagination>
                <br />
            </div>
        )
    }

};

AppPagination.propTypes = {
    pages: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired
}

export default withRouter(AppPagination);