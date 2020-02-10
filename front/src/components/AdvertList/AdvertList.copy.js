import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Advert from '../Advert/Advert'
import AppPagination from '../AppPagination/AppPagination'

const ITEMS_PER_PAGE = 3; // !! pending: to config or register !!

export class AdvertList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pages: Math.ceil(this.props.adverts.length / ITEMS_PER_PAGE),
            currentPage: this.getCurrentPage(this.props.adverts.length),
        }
    }

    buildAdList = (adverts) => {
        return (
            <>
                {
                    adverts.map(advert => <Advert advert={ advert } key={ advert.id } />)
                }
            </>
        )
    };

    
    getCurrentPage(length) {
    // return current page from url. 1 by default
        
        const urlSearch = this.props.history.location.search;
        let currentPage = 1;
        
        if (urlSearch.length > 0 && urlSearch.indexOf('page') > 0)
            currentPage = urlSearch.substring(urlSearch.indexOf('page=') + 'page='.length, urlSearch.length);
        

        // return (urlSearch.length > 0 && urlSearch.indexOf('page') > 0) ? parseInt(urlSearch.substring(urlSearch.indexOf('page') + 'page'.length, urlSearch.length)) : 1
        return parseInt(currentPage);
    }

    redirectOverPages (){

        // redirect to last page in case param page exceed max pagination page

        let { currentPage , pages } = this.state;
    
        if (currentPage > pages) {
            const path = `${this.props.location.pathname}?page=${pages}`;
            this.props.history.push(path);
        }
    }

    componentDidMount (){

        this.redirectOverPages();
    }
    
    render() {
        let { adverts } = this.props;
        // const { currentPage, pages } = this.state;
        
        // pagination
        const pages = Math.ceil(adverts.length / ITEMS_PER_PAGE);
        let currentPage = this.getCurrentPage(adverts.length);
        
        if (currentPage > pages)
            currentPage = pages;            

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;    // first index on [adverts] to show in this page

        adverts = adverts.slice(startIndex, startIndex + ITEMS_PER_PAGE); // Optimize on API call
        
        return (
            <div className='container mt-5 mb-5'>
                <div className='card-columns'>
                    {
                        adverts
                        &&
                        adverts.length
                        &&
                        this.buildAdList(adverts)
                    }

                    {
                        !adverts
                        &&
                        <div className='text-center mt-5'>
                            <h2>No advertisements found</h2>
                        </div>
                    }
                </div>
                <div className='pagination-row'>
                    <br/>
                    <hr/>
                    <br/>
                    <AppPagination currentPage={ currentPage } pages={ pages } /> 
                </div>
            </div>
        );
    }
}

AdvertList.propTypes = {
    adverts: PropTypes.array.isRequired
}

export default withRouter(AdvertList);