import React from 'react';
import { shallow } from 'enzyme';

import { AdList } from './AdList';

describe.only('AdList', () => {

    const adverts = [
            { id: "5e19a0db2ab1b61184740c44", name: "PS4Pro", description: "Compro PS4 Pro con menos de 1 año de uso", price: 200.99, type: "buy", photo: "" },
            { id: "5e19a0db2ab1b61184740c45", name: "XBOX OneX", description: "Vendo XBOX One X como nueva. No tengo tiempo para jugar.", price: 170.05, type: "sell", photo: "" },
            { id: "5e19a0db2ab1b61184740c46", name: "Raton Gaming Razer Mamba", description: "El mejor ratón gamer del mercado. Como nuevo (1 año)", price: 35.5, type: "sell", photo: "" },
            { id: "5e19a0db2ab1b61184740c47", name: "Teclado Gaming Razer Chroma", description: "Busco teclado razer en buen estado.", price: 70, type: "buy", photo: "" },
            { id: "5e19a0db2ab1b61184740c48", name: "Gráfica Gaming 1080ti", description: "Todavía una bestia parda en el 2k.", price: 400, type: "buy", photo: "" },
            { id: "5e19a0db2ab1b61184740c49", name: "PC Gaming (i7 6700K)", description: "Acabo de tener un hijo... se me acabo el gaming :)", price: 700, type: "sell", photo: "" },
        ];

    const defaultProps = {
        history: {
            location: {
                search: ''
            }
        }
    }

    const render = (ads, props) => shallow(<AdList ads={ads} {...props} />);

    let wrapper;
    
    beforeEach(() => {
        wrapper = render(adverts, defaultProps);
        // console.log('wrapper.debug', wrapper.debug());
    });
    
    it('should render', () => {

        expect(wrapper.exists()).toBe(true);
    });

    it('should render a AdList component', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render a list of 3 ads', () => {

        expect(wrapper.find(".card-columns").children()).toHaveLength(3);
    });


    it('first advert is adverts[0]', () => {

        expect(
            wrapper
                .find(".card-columns")
                .childAt(0)
                .props().ad.id
        ).toBe(adverts[0].id);
    });

});
