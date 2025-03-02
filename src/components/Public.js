import { Link, useNavigate } from "react-router-dom"
import Header from "./Header"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/auth/authSlice"
import { useEffect } from "react"

const Public = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("login")){
            navigate('welcome')
        }
    },[])

    const content = (
        <div className="page">
            <Header/>
            <section className="public" style={{display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
                <header>
                    <h1 style={{textAlign : 'center'}}>Welcome to trash management app.</h1>
                </header>
                <main style={{textAlign : 'center'}}>
                    
                    <p>this is still in development please use with caution</p>
                    <p>เว็บไซด์ที่ยังอยู่ในการพัฒนา โปรดใช้ด้วยความระวัง</p>
                </main>
                <button className='buttonCF' style={{fontSize : '90%' , height : '5vh'}} onClick={() => navigate('login')}>Login หรือ registor</button>
            </section>
        </div>

    )
    return content
}
export default Public