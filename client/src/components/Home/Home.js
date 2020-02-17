import React  from "react";
import Canvas from '../Canvas/Canvas';
import AdvertList from '../AdvertList';

import SearchPanel from '../SearchPanel';

function handleSearch() {
    console.log('handleSearch');
}

/**
 * Loads intial list of adverts
 * If refactor to function component use useEffect to avoid infinite fetchs
 */

export default class Home extends React.Component {

    componentDidMount() {
        this.loadAdverts();
    }

    loadAdverts = this.props.loadAdverts;

    render() {

        return (
            <Canvas>
                <div className='container mt-5 mb-5'>
                    <SearchPanel handleSearch={handleSearch} />
                </div>

                <AdvertList  />
            </Canvas>
        );
    }
}