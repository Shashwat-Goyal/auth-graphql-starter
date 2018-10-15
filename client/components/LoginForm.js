import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
    }

    onLogin({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(err => {
            const errors = err.graphQLErrors.map(error => error.message)
            this.setState({
                errors
            })
        })
    }

    render() {
        const { errors=[] } = this.state;
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    onSubmit={this.onLogin.bind(this)}
                    errors={errors}
                />
            </div>
        )
    }
}

export default graphql(mutation)(LoginForm);