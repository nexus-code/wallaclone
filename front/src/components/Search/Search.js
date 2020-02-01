import React  from "react";
import Canvas from '../Canvas/Canvas';

import { Container, Row, Col, Button }  from 'react-bootstrap';
import AdList    from '../AdList/AdList';
import TagSelect from '../TagsSelect/TagSelect'
import Input     from '../Input/Input'
import * as API  from '../../services/AdService';

const TYPES = ['sell', 'buy']

export default class Search extends React.Component {

    /* Show ads by filters */

    constructor(props) {
        super(props);

        this.state = {
            ads: [],
            // user: getUserLS(),
            tags: '',
            type: '',
            name: '',
            minPrice: '',
            maxPrice: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    searchAds = () => {


        // Mounting searchString to send to the API
        const { tags, name, type, minPrice, maxPrice } = this.state;
        
        let searchString = tags === '' ? '' : `tag=${tags}&`;
        searchString += name === '' ? '' : `name=${name}&`;
        
        if(type !== '')
            searchString += type === 'sell' ? 'venta=true&' : `venta=false&`;
        
        searchString += (minPrice !== '' || maxPrice !== '') ? 'Price=' : '';

        searchString += minPrice === '' ? '' : `${minPrice}`;
        searchString += maxPrice === '' ? '' : `-${maxPrice}`;


        API.searchAds(searchString)
            .then(ads => {
            this.setState({
                ads
            }, () => (this.goTo(1)))
        });
        
    }

    goTo(index) {
        // redirect to first index of serie

        const path = `${this.props.location.pathname}?page=${index}`;
        this.props.history.push(path);
    } 

    componentDidMount() {

        this.searchAds();
    }


    handleChange(event) {

        const { name, value } = event.target;
        // console.log(name, value);

        this.setState({
            ads: [],    // reset 
            [name]: value
        }, () => this.searchAds()); // search after setState via callback

    }
    
    reset () {
        
        window.location.reload(false);
    }
    

    render() {
        const { ads, tags, name, type, minPrice, maxPrice } = this.state;

        return (
            <Canvas>
                <Container className='container mt-5 mb-5 p-5 card'>
                    <h2 className="mb-4">Search products.</h2>
                    <h5 
                        className="mb-4" 
                        style= {{ color: ads.length === 0 ? 'red' : 'green' }}

                    >Founds: { ads.length }</h5>
                    <Row>
                        <Col md={4} xs={12} >
                            Tag: <TagSelect onChange={this.handleChange} value={ [tags] } />
                        </Col>
                        <Col md={4} xs={12} >
                            Name: <br/><Input clasName="formControl" onChange={this.handleChange} name={`name`} value={name} placeholder={`Pulse enter to send`} />
                        </Col>
                        <Col md={2} xs={12} >
                            Type:
                            <div key={`inline-${type}`}>
                                {TYPES.map(type => (
                                    <div key={`${type}`}>
                                        <input type='radio'
                                                name='type'
                                                value={`${type}`}
                                                onChange={this.handleChange}
                                                // checked={`${type}` === type}
                                            />
                                            <span style={{ textTransform: 'capitalize' }}>{` ${type}`}  </span>
                                    </div>
                                ))}
                            </div>
                        </Col>        
                    </Row>
                    <Row>
                        <Col xs={12} >

                            Price:<br />
                            <Input clasName="formControl" onChange={this.handleChange} name={`minPrice`} value={minPrice} placeholder={`Min price. Enter to send`} />
                            /
                            <Input clasName="formControl" onChange={this.handleChange} name={`maxPrice`} value={maxPrice} placeholder={`Max price. Enter to send`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} >
                            <Button variant="primary" className="float-right" onClick={this.reset}>
                                Reset
                            </Button>
                        </Col> 
                    </Row>           
                </Container>

                {
                    ads
                    &&
                    ads.length
                    &&
                    <AdList ads={ads} />
                }
            </Canvas>
        );
    }
}