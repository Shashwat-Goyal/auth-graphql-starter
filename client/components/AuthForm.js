import React, { Component } from 'react';

class AuthForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSubmit({email, password});
    }

    render() {
        const { email='', password='' } = this.state;
        const { errors=[] } = this.props;

        return (<div className="row">
            <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
                <div className="input-field">
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={event => this.setState({email: event.target.value})}
                    />
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={event => this.setState({password: event.target.value})}
                    />
                </div>

                {
                    errors.map((error, i) => {
                        return <div key={i} style={{color: 'red'}}>
                            {error}
                        </div>
                    })
                }

                <button className="btn">Submit</button>
            </form>
        </div>
        )
    }
}

export default AuthForm;