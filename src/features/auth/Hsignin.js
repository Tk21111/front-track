import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useSigninMutation } from './authApiSlice';
import { translate } from '../../hooks/translator';

const Signin = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signin, { isLoading }] = useSigninMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (/\s/.test(user)) {
            setErrMsg('Username must not contain spaces');
            return;
        }

        if (pwd !== cpwd) {
            setErrMsg('Passwords do not match');
            return;
        }

        try {
            const userData = await signin({ user, pwd }).unwrap();
            dispatch(setCredentials({ ...userData, user }));
            setUser('');
            setPwd('');
            setCPwd('');
            navigate('/login');
        } catch (err) {
            const status = err.originalStatus;
            if (!status) setErrMsg('No Server Response');
            else if (status === 400) setErrMsg('Missing Username or Password');
            else if (status === 401) setErrMsg('Unauthorized');
            else if (status === 409) setErrMsg('Username already taken');
            else setErrMsg('Login Failed');
            errRef.current?.focus();
        }
    };

    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="page">
            <section className="login">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <h1 className='welcomefont' style={{color : '#FFE55F'}}>Signin</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className='welcomefont' style={{color : '#F9AEFF'}}>{translate('username')}</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="password" className='welcomefont' style={{color : '#F9AEFF'}}>{translate("password")}</label>
                    <input
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                    />
                    <label htmlFor="cpassword" className='welcomefont' style={{color : '#F9AEFF'}}>{translate("cpassword")}</label>
                    <input
                        type="password"
                        id="cpassword"
                        value={cpwd}
                        onChange={(e) => setCPwd(e.target.value)}
                        required
                    />
                    <button className='buttonCF' style={{color : '#B0E7FF' , backgroundColor : '#F9AEFF'}}>{translate("signin")}</button>
                </form>
            </section>
        </div>
    );
};

export default Signin;
