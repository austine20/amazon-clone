import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/Login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


function LoginPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = e => {
        e.preventDefault();
        //firebase Login funtionality goes in here
        try {
            const userLogin = signInWithEmailAndPassword(
                auth, 
                email, 
                password
                );
                if (userLogin) {
                    history.push('/')
                }
        } catch(error) {
            alert(error.message);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        // firebase register funtionality goes in here
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            );
            console.log(user)
            if (user) {
                history.push('/')
            }
        } catch(error) {
            alert(error.message);
        }


    }
    return (
        <div className='Login'>
            <Link to='/'>
                <img className='Login__logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
            </Link>

            <div className="Login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input 
                    type="text"  
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button type='submit' className='Login__signInBtn' onClick={handleSignin}>Sign In</button>
                </form>

                <p>
                By signing-in you agree to the 
                AMAZON FAKE CLONE Conditions of Use & Sale. 
                Please see our Privacy Notice, our Cookies Notice 
                and our Interest-Based Ads Notice. 
                </p>

                <button className='Login__registerBtn' onClick={handleRegister}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default LoginPage
