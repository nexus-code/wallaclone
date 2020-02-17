import React  from "react";
import Canvas from '../Canvas/Canvas';
import AdvertList from '../AdvertList';
import SearchPanel from '../SearchPanel';

export default function Home({ loadAdverts }) {

    loadAdverts();

    return <Canvas>
            <div className='container mt-5 mb-5'>
                <SearchPanel />
            </div>

            <AdvertList  />
        </Canvas>
}