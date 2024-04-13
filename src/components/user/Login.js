import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import Loader from '../loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, login, register } from "../../actions/userAction"
import toast from 'react-hot-toast';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const [reg, setReg] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const loginRegisterSubmit = (e) => {
        e.preventDefault();
        if (name) {
            dispatch(register(name, email, password))
        }
        else {
            dispatch(login(email, password));
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/");
        }

    }, [dispatch, error, isAuthenticated, navigate])



    return (
        <div>
            {loading ? <Loader /> : (
                <div className='add-form-container'>
                    {reg ? (<h3>Sign Up</h3>) : (<h3>Sign In</h3>)}
                    <form onSubmit={loginRegisterSubmit}>
                        {reg && (
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='Name'
                                    required
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className='form-group'>
                            <input
                                type='email'
                                name='email'
                                required
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='text'
                                name='password'
                                required
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='login-signup-text'>
                            {reg ? (
                                <p>Already a User? <Link onClick={() => setReg(!reg)}>Login</Link></p>
                            ) : (
                                <p>New User? <Link onClick={() => setReg(!reg)}>Register</Link></p>
                            )}
                        </div>
                        <button className='login-signup-button' type='submit'>{reg ? "Register" : "Login"}</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Login