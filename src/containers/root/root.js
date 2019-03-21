import React, {Component} from 'react';
import {configureStore} from "../../store/configure-store";
import {Provider} from "react-redux";
import {reduxForm} from "redux-form";
import {FinancialRange, validate} from "./financial-range";
import {withStyles} from '@material-ui/core/styles';
import {withRoot} from "../../components/with-root/with-root";
import AppBar from "../../components/app-bar/app-bar";

const store = configureStore();

const FinancialRangeInstance = reduxForm({
    form: 'financialRange',
    validate
})(FinancialRange);

const styles = theme => ({
    root: {
        textAlign: 'center',
    },
    pageContainer: {
        marginTop: theme.spacing.unit * 3
    }
});

class AppRoot extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Provider store={store}>
                <div className={classes.root} >
                    <AppBar className={classes.appBar}/>
                    <div className={classes.pageContainer} >
                        <FinancialRangeInstance/>
                    </div>
                </div>
            </Provider>
        );
    }
}

const Root = withRoot(withStyles(styles)(AppRoot));

export {Root};
