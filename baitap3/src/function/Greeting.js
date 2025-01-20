import React from "react";

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: window.localStorage.getItem("firstName") || "",
            lastName: window.localStorage.getItem("lastName") || "",
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    handleFirstNameChange = (e) => this.setState({ firstName: e.target.value });
    handleLastNameChange = (e) => this.setState({ lastName: e.target.value });

    componentDidUpdate() {
        window.localStorage.setItem('classFirstName', this.state.firstName);
        window.localStorage.setItem('classLastName', this.state.lastName);
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange} />
                <br />
                <input
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange} />
                <p>
                    xin chào, {''}
                    <span>{this.state.firstName} {this.state.lastName}</span>
                </p>
            </div>
        );
    }
}