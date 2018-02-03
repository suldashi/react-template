import React from "react";

const autoBind = require("react-auto-bind");

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div>We made it home! Edit the <pre>/src/ui/home-component.jsx</pre> file to get started</div>;
    }
}