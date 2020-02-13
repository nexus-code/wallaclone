import React  from "react";
import Canvas from '../Canvas/Canvas';
import AdvertList from '../AdvertList';

import SearchPanel from '../SearchPanel';

function getAdverts() {
    console.log('getAdverts');
}


export default class Home extends React.Component {

    componentDidMount() {
        this.loadAdverts();
    }

    loadAdverts = this.props.loadAdverts;

    render() {

        const { adverts } = this.props; 

        return (
            <Canvas>
                <div className='container mt-5 mb-5'>
                    <SearchPanel handleSearch={getAdverts} />
                </div>
                {
                    adverts
                    &&
                    adverts.length
                    &&
                    <AdvertList adverts={adverts} />
                }
            </Canvas>
        );
    }
}