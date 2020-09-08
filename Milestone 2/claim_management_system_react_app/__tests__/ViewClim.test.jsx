/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ViewClaim from '../component/ViewClaim';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
describe('View Claims', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store}>
            <ViewClaim />
        </Provider>).toJSON();
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

