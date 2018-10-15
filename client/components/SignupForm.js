import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
    }

    onSignup({ email, password }) {
        console.log(email, password)
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(err => {
            console.log(err.graphQLErrors, 'err')
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
                <h3>Signup</h3>
                <AuthForm 
                    onSubmit={this.onSignup.bind(this)}
                    errors={errors}
                />
            </div>
        )
    }
}

export default graphql(mutation)(SignupForm);