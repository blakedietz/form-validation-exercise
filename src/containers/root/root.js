import React, { Component } from 'react';
import './root.css';
import { configureStore } from "../../store/configure-store";
import { Provider } from "react-redux";
import { reduxForm } from "redux-form";
import { FinancialRange, validate } from "./financial-range";

const store = configureStore();

const FinancialRangeInstance = reduxForm({
    form: 'financialRange',
    validate
})(FinancialRange);

export { FinancialRange };

class Root extends Component {
  render() {
    return (
        <Provider store={store}>
            <FinancialRangeInstance/>
        </Provider>
    );
  }
}

export {
    Root
}
