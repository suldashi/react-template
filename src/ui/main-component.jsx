import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {NotFoundComponent} from './not-found-component';

export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.HomeComponentWithProps = this.HomeComponentWithProps.bind(this);
        this.NotFoundComponentWithProps = this.NotFoundComponentWithProps.bind(this);
    }

    render() {
        return <div>
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
        </div>;
    }

    HomeComponentWithProps() {
        return <HomeComponent socket={this.socket} />
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent socket={this.socket} />
    }
}