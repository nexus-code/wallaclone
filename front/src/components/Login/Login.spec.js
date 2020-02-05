import React from 'react';
import { shallow } from 'enzyme';

import Login from './Login';

describe('Login', () => {
    
    const props = {
        user: {
            username: 'test username',
            password: 'test password',
        },
        setUser: jest.fn(),
        logout: jest.fn(),
    };
    
    const wrapper = shallow(<Login {...props} />);


    it('should render a Login component', () => {
        
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

    describe('should login user', () => {
        wrapper
        .find('[name="username"]')
            .simulate("change", { target: { value: props.user.username, name: "username" } });
        
        wrapper
            .find('[name="password"]')
            .simulate("change", { target: { value: props.user.password, name: "password" } });
            
            
        
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
