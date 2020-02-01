import React  from "react";
import Canvas from '../Canvas/Canvas';
import AdList from '../AdList/AdList';

export default class Home extends React.Component {

    componentDidMount() {
        this.loadAds();
    }

    loadAds = this.props.loadAds;

    render() {

        const { ads } = this.props; 

        return (
            <Canvas>
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