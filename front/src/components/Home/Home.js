import React  from "react";
import Canvas from '../Canvas/Canvas';
import AdvertList from '../AdvertList';

export default class Home extends React.Component {

    componentDidMount() {
        this.loadAdverts();
    }

    loadAdverts = this.props.loadAdverts;

    render() {

        const { adverts } = this.props; 

        return (
            <Canvas>
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