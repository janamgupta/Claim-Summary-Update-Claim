/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../reducers/store.js';
class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
            <div>
                {this.props.children}
            </div>
            </Provider>
        )
    }
}
export default App;