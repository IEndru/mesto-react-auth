import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Register = ({onRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({email,password})
    };

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
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
                       required
                       name="password"
                       autoComplete="password"
                       onChange={({target}) => setPassword(target.value)}
                       id="password"
                />
                <button className="login__form-btn" type="submit">Зарегистрироваться</button>
                <Link to="/sign-in" className="login__help">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
};

export default Register;