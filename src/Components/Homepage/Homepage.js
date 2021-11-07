import React, { useEffect } from 'react'
import './Homepage.css'
import CurvetopLeft from '../../Assets/Images/curve_top_left.png';
import CurvebottomRight from '../../Assets/Images/curve_bottom_right.png'
import db, { auth, provider } from '../Firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useNavigate } from 'react-router-dom';


function Homepage() {
    const [{ user }, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error) => alert(error.message));
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            //creating the database
            const databaseFunction = () => {
                console.log('run');
                db.collection('USERS_BUMAGO').doc(user.email).get().then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        db.collection("USERS_BUMAGO").doc(user.email).set({
                            name: user.displayName,
                            email: user.email,
                            notes: []
                        })
                    }
                })
            }
            databaseFunction();
            navigate('/notes')
        }
    }, [user, navigate])
    return (
        <div className="flex__center homepage__master">
            <div>
                <div className="flex__center__vert">
                    <h2 className="font2">Welcome</h2>
                    <h2 className="font2">to</h2>
                    <h1 className="font1">B<span>U</span>MAGA<span>.</span></h1>
                </div>
                <div className="flex__center">
                    <button className="flex__center signin__button" onClick={() => signIn()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1792 1792" fill="#FE5F55"><path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z" /></svg>
                        <p>Sign in with Google</p>
                    </button>
                </div>
                <br></br>
                <p>Made with ❤️ by @ar_8creax9</p>
            </div>
            <img src={CurvetopLeft} alt="CurvetopLeft" className="CurvetopLeft"></img>
            <img src={CurvebottomRight} alt="CurvebottomRight" className="CurvebottomRight"></img>
        </div>
    )
}

export default Homepage
