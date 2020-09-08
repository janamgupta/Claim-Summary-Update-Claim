/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../component/LoginComponent';
import Axios from 'axios';

jest.mock('Axios');
describe('Login', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// test('should fetch users', () => {
//     const users = [{"_id":1,"username":"abc12","password":"abc12"},{"_id":2,"username":"pqr12","password":"pqr12"}];
//     const resp = {data: users};
//     Axios.get.mockResolvedValue(resp);
//     let login = new Login();  
//     login.userValidation().then(data => expect(data).toEqual(users));
//   });

