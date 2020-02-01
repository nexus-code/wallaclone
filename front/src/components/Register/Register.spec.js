import React from 'react';
import { shallow } from 'enzyme';

import Register from './Register';
// import { setUser } from '../../store/user/actions';

describe('Register', () => {
    
    const props = {
        user: {
            name: 'test name',
            surname: 'test surname',
        },
        setUser: jest.fn(),
        logout: jest.fn(),
    };
    
    const wrapper = shallow(<Register {...props} />);


    it('should render a Register component', () => {
        
        expect(wrapper).toMatchSnapshot();
    });

    describe('should do logout', () => {

        wrapper
            .find('.logoutButton')
            .simulate('click');

        it('should logout user', () => {
            expect(props.logout).toHaveBeenCalled();
        });
    });

    describe('should register user', () => {
        wrapper
        .find('[name="name"]')
        .simulate("change", { target: { value: props.user.name, name: "name" } });
        
        wrapper
            .find('[name="surname"]')
            .simulate("change", { target: { value: props.user.surname, name: "surname" } });
            
            
        
        const preventDefault = jest.fn();
        wrapper.find('Form').simulate('submit', { preventDefault });
        
        it('should prevent default Form submission', () => {
            
            expect(preventDefault).toHaveBeenCalled();
        });
        

        it('should save user data', () => {

                
            // console.log('wrapper.debug(FORM)', wrapper.find('Form').debug());

            expect(props.setUser).toHaveBeenCalledWith(
            
                expect.objectContaining(props.user)
            );

        });

    });
});
