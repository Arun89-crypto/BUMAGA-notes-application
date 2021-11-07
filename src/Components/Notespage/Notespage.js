import React, { useState, useEffect } from 'react'
import Plus from '../../Assets/Images/plus.svg'
import Note from './Note/Note';
import './Notespage.css'
import firebase from 'firebase';
import db, { auth } from '../Firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useNavigate } from 'react-router-dom';

function Notespage() {
    const [toggleOption, setToggleOption] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [{ user }, dispatch] = useStateValue();
    const [notes, setNotes] = useState([]);
    const [displayNotes, setDisplayNotes] = useState(false);
    const navigate = useNavigate();
    const SignOut = () => {
        auth.signOut().then(
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
            })
        );
        navigate('/')
    }
    useEffect(() => {
        if (user) {
            function getData() {
                const data = firebase.firestore().collection("USERS_BUMAGO");
                data.onSnapshot((snapshot) => {
                    let Items = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().email === user.email) {
                            Items.push(doc.data().notes);
                        }
                    })
                    setNotes(Items[0]);
                })
            }
            getData();
            setTimeout(() => {
                setDisplayNotes(true);
            }, 3000);
        } else {
            console.log("no user");
        }
    }, [user])
    return (
        <div>
            <Navbar setAddNote={setAddNote} />
            {
                (displayNotes) ?
                    < NotesSection notes={notes} /> : <div className="loading flex__center__vert">
                        <div className="loader"></div>
                        {
                            (!user) ? <> <h1 className="font1">No User<span>.</span></h1> <p>Please Sign in Again</p> </> : ''
                        }
                    </div>
            }
            <AddNote setAddNote={setAddNote} addNote={addNote} user={user} />
            {
                (toggleOption) ? (
                    <button className="log_out_button flex__center" onClick={() => SignOut()}>
                        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 15C0 15.3978 0.158036 15.7794 0.43934 16.0607C0.720645 16.342 1.10218 16.5 1.5 16.5H12.885L9.435 19.935C9.29441 20.0744 9.18282 20.2403 9.10666 20.4231C9.03051 20.6059 8.9913 20.802 8.9913 21C8.9913 21.198 9.03051 21.3941 9.10666 21.5769C9.18282 21.7597 9.29441 21.9256 9.435 22.065C9.57444 22.2056 9.74035 22.3172 9.92313 22.3933C10.1059 22.4695 10.302 22.5087 10.5 22.5087C10.698 22.5087 10.8941 22.4695 11.0769 22.3933C11.2597 22.3172 11.4256 22.2056 11.565 22.065L17.565 16.065C17.7016 15.9223 17.8086 15.7541 17.88 15.57C18.03 15.2048 18.03 14.7952 17.88 14.43C17.8086 14.2459 17.7016 14.0777 17.565 13.935L11.565 7.935C11.4251 7.79514 11.2591 7.6842 11.0764 7.60851C10.8936 7.53282 10.6978 7.49386 10.5 7.49386C10.3022 7.49386 10.1064 7.53282 9.92363 7.60851C9.74089 7.6842 9.57486 7.79514 9.435 7.935C9.29514 8.07486 9.1842 8.24089 9.10851 8.42363C9.03282 8.60636 8.99386 8.80221 8.99386 9C8.99386 9.19779 9.03282 9.39364 9.10851 9.57637C9.1842 9.75911 9.29514 9.92514 9.435 10.065L12.885 13.5H1.5C1.10218 13.5 0.720645 13.658 0.43934 13.9393C0.158036 14.2206 0 14.6022 0 15V15ZM19.5 0H4.5C3.30653 0 2.16193 0.474106 1.31802 1.31802C0.474106 2.16193 0 3.30653 0 4.5V9C0 9.39782 0.158036 9.77936 0.43934 10.0607C0.720645 10.342 1.10218 10.5 1.5 10.5C1.89782 10.5 2.27936 10.342 2.56066 10.0607C2.84196 9.77936 3 9.39782 3 9V4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H19.5C19.8978 3 20.2794 3.15804 20.5607 3.43934C20.842 3.72064 21 4.10218 21 4.5V25.5C21 25.8978 20.842 26.2794 20.5607 26.5607C20.2794 26.842 19.8978 27 19.5 27H4.5C4.10218 27 3.72064 26.842 3.43934 26.5607C3.15804 26.2794 3 25.8978 3 25.5V21C3 20.6022 2.84196 20.2206 2.56066 19.9393C2.27936 19.658 1.89782 19.5 1.5 19.5C1.10218 19.5 0.720645 19.658 0.43934 19.9393C0.158036 20.2206 0 20.6022 0 21V25.5C0 26.6935 0.474106 27.8381 1.31802 28.682C2.16193 29.5259 3.30653 30 4.5 30H19.5C20.6935 30 21.8381 29.5259 22.682 28.682C23.5259 27.8381 24 26.6935 24 25.5V4.5C24 3.30653 23.5259 2.16193 22.682 1.31802C21.8381 0.474106 20.6935 0 19.5 0Z" fill="#FE5F55" />
                        </svg>
                        <h3>Log Out</h3>
                    </button>
                ) : ''
            }
            <button className="account_button flex__center" style={{ borderRadius: `${(!toggleOption) ? '10px' : '50%'}`, cursor: 'pointer' }} onClick={() => setToggleOption(!toggleOption)}>
                {
                    (!toggleOption) ? (
                        <>
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.646 10.7155C14.6264 9.94416 15.342 8.88642 15.6933 7.68944C16.0445 6.49246 16.014 5.21576 15.6058 4.03696C15.1977 2.85817 14.4323 1.83589 13.4161 1.11235C12.3999 0.388815 11.1835 0 9.93603 0C8.68858 0 7.47215 0.388815 6.45596 1.11235C5.43978 1.83589 4.67438 2.85817 4.26624 4.03696C3.85811 5.21576 3.82754 6.49246 4.17879 7.68944C4.53004 8.88642 5.24564 9.94416 6.22603 10.7155C4.54611 11.3885 3.08032 12.5048 1.98492 13.9454C0.88953 15.386 0.205595 17.0968 0.00603184 18.8955C-0.00841357 19.0268 0.00314838 19.1597 0.0400573 19.2866C0.0769662 19.4134 0.138499 19.5317 0.221143 19.6348C0.388051 19.843 0.630815 19.9763 0.896032 20.0055C1.16125 20.0347 1.42719 19.9573 1.63536 19.7904C1.84352 19.6235 1.97686 19.3807 2.00603 19.1155C2.22562 17.1607 3.15772 15.3553 4.62425 14.0443C6.09078 12.7333 7.98893 12.0085 9.95603 12.0085C11.9231 12.0085 13.8213 12.7333 15.2878 14.0443C16.7543 15.3553 17.6864 17.1607 17.906 19.1155C17.9332 19.3612 18.0505 19.5882 18.2351 19.7525C18.4198 19.9169 18.6588 20.007 18.906 20.0055H19.016C19.2782 19.9753 19.5178 19.8428 19.6826 19.6367C19.8474 19.4307 19.9241 19.1679 19.896 18.9055C19.6955 17.1017 19.0079 15.3865 17.9069 13.9437C16.8059 12.5009 15.3329 11.385 13.646 10.7155V10.7155ZM9.93603 10.0055C9.14491 10.0055 8.37155 9.7709 7.71375 9.33137C7.05595 8.89185 6.54326 8.26713 6.24051 7.53623C5.93776 6.80533 5.85855 6.00106 6.01289 5.22513C6.16723 4.44921 6.54819 3.73648 7.1076 3.17707C7.66701 2.61766 8.37975 2.2367 9.15567 2.08235C9.9316 1.92801 10.7359 2.00723 11.4668 2.30998C12.1977 2.61273 12.8224 3.12542 13.2619 3.78321C13.7014 4.44101 13.936 5.21437 13.936 6.0055C13.936 7.06636 13.5146 8.08378 12.7645 8.83392C12.0143 9.58407 10.9969 10.0055 9.93603 10.0055Z" fill="white" />
                            </svg>
                            <h3>Account</h3>
                        </>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(45deg)` }}>
                            <path d="M28 13H2C0.89543 13 0 13.8954 0 15C0 16.1046 0.89543 17 2 17H28C29.1046 17 30 16.1046 30 15C30 13.8954 29.1046 13 28 13Z" fill="#FFF" />
                            <path d="M17 28V2C17 0.89543 16.1046 0 15 0C13.8954 0 13 0.89543 13 2L13 28C13 29.1046 13.8954 30 15 30C16.1046 30 17 29.1046 17 28Z" fill="#FFF" />
                        </svg>
                    )
                }
            </button>
        </div>
    )
}


const Navbar = ({ setAddNote }) => {
    return (
        <div className="navbar flex__center__spacebetween">
            <h1 className="font1">Notes<span>.</span></h1>
            <img src={Plus} alt="plus" width="25px" onClick={() => setAddNote(true)} style={{ cursor: 'pointer' }}></img>
        </div>
    )
}

const NotesSection = ({ notes }) => {
    return (
        <div className="notes__section">
            {
                (notes.length !== 0) ? (
                    notes.map((note) => {
                        return <Note note={note}></Note>
                    })
                ) : <p>No notes yet</p>
            }
        </div>
    )
}

const AddNote = ({ setAddNote, addNote, user }) => {
    const [noteCont, setNoteCont] = useState('')
    const handleSave = () => {
        var data = db.collection("USERS_BUMAGO").doc(user.email);
        data.update({
            notes: firebase.firestore.FieldValue.arrayUnion(noteCont)
        })
        setNoteCont('');
        setAddNote(false);
    }
    return (
        <div className={(addNote) ? "add__note__section flex__center__vert visible" : "add__note__section flex__center__vert"}>
            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(45deg)', position: 'fixed', top: '2.5%', right: '2.5%', cursor: 'pointer' }} onClick={() => setAddNote(false)}>
                <path d="M28 13H2C0.89543 13 0 13.8954 0 15C0 16.1046 0.89543 17 2 17H28C29.1046 17 30 16.1046 30 15C30 13.8954 29.1046 13 28 13Z" fill="#FE5F55" />
                <path d="M17 28V2C17 0.89543 16.1046 0 15 0C13.8954 0 13 0.89543 13 2L13 28C13 29.1046 13.8954 30 15 30C16.1046 30 17 29.1046 17 28Z" fill="#FE5F55" />
            </svg>
            <h1 className="font1">Add Note<span>.</span></h1>
            <div className="flex__center__vert">
                <input placeholder="Enter the note.." value={noteCont} onChange={(e) => setNoteCont(e.target.value)}></input>
                <button onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    )
}


export default Notespage
