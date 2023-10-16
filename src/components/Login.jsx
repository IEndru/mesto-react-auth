import React, { useState } from 'react';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email,password})
    };

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    name="email"
                    autoComplete="email"
                    onChange={({target}) => setEmail(target.value)}
                    id="email"
                />
                <input className="login__form-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="Password"
                    autoComplete="Password"
                    onChange={({target}) => setPassword(target.value)}
                    id="password"
                />
                <button className="login__form-btn" type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;