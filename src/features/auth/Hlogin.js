import { useRef, useState, useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { translate } from '../../hooks/translator'

const Login = () => {
    const userRef = useRef() //set focus on userinput
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist , setPersist] = usePersist()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const userData = await login({ user, pwd }).unwrap()
            //diffrent the ...userData is a accessToken
            console.log({...userData , user})
            dispatch(setCredentials({ ...userData, user }))
            localStorage.setItem("login" , userData.refreshToken )
            setUser('')
            setPwd('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed pls wait or change username');
            }

            if (errRef.current) return errRef.current.focus();
            
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const content = isLoading ? <h1>Loading...</h1> : (
        <div className='page'>
            <section className="login">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                <div className="single-parent" style={{display : 'flex' , justifyContent: 'center'}}>
                    <img src={require("../../components/img/Smart_drop_trash.png")} alt="logo" style={{width : '50%' , height : '50%'}}/>
                </div>
                <h1  style={{ textAlign : 'center'}}>Log in</h1>

                <form onSubmit={handleSubmit}> 
                <label htmlFor="username"  className='welcomefont' style={{color : 'whitesmoke' , textDecoration : 'underline' , textUnderlinePosition : 'under'}}>{translate("username")}</label>
                <input
                        type="text"
                        id="username"
                        ref={userRef}
                        value={user}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                        style={{backgroundColor : 'whitesmoke' , boxShadow : '2px 2px 0px 1px black'}}
                    />

                    <label htmlFor="password"  className='welcomefont' style={{color : 'whitesmoke' , textDecoration : 'underline' , textUnderlinePosition : 'under'}}>{translate("password")}</label>
                    <input
                        type="password" //doesn't show it 
                        id="password"
                        onChange={handlePwdInput}
                        value={pwd}
                        required
                        style={{backgroundColor : 'whitesmoke' , boxShadow : '2px 2px 0px 1px black'}}
                        />

                        <label htmlFor="password"  className='welcomefont' style={{color : 'whitesmoke'  }}>
                        <input
                            type="checkbox"
                           
                            style={{width : '10%' , height : '2vh'}}
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                            required
                        />
                        {translate("TTD")}
                    </label>
                    <button className='buttonCF' >{translate("login")}</button>
                </form>
                <div style={{display : 'flex' , justifyContent: 'center' , marginTop : '3%'}}>
                    <button onClickCapture={() => navigate('/registor')} className='buttonCF' style={{color : 'whitesmoke' , backgroundColor : 'blue' , boxShadow : '3.5px 3.5px 0px 1px black'}}>{translate("signin")}</button>
                </div>
            </section>
            
        </div>
    )

    return content
}
export default Login