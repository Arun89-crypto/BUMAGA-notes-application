import React, { useState } from 'react'
import firebase from 'firebase';
import db from '../../Firebase';
import { useStateValue } from '../../StateProvider'

function Note({ note }) {
    const [deleteNote, setDeleteNote] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [{ user }] = useStateValue();

    return (
        <div className="flex__center__spacebetween">
            <DeleteNote deleteNote={deleteNote} setDeleteNote={setDeleteNote} value={note} user={user} />
            <EditNote value={note} editNote={editNote} setEditNote={setEditNote} user={user} />
            <p>{note}</p>
            <div className="note__options flex__center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setEditNote(true)}>
                    <path d="M21.0175 0.340897C20.8005 0.123939 20.4984 0 20.1963 0C19.8864 0 19.592 0.123939 19.3751 0.340897L10.4894 9.21967C10.2879 9.42112 10.1718 9.69232 10.1562 9.97897L10.0013 12.7759C9.98579 13.1013 10.1098 13.4266 10.3422 13.6591C10.5591 13.876 10.8535 14 11.1633 14H11.2253L14.022 13.845C14.3008 13.8295 14.572 13.7056 14.7734 13.5042L23.6591 4.63308C23.8761 4.40841 24 4.114 24 3.81183C24 3.50191 23.8761 3.20753 23.6591 2.98282L21.0175 0.340897Z" fill="#FE5F55" />
                    <path d="M3.9738 24H17.0262C19.2177 24 21 22.2173 21 20.0262V11.9801C21 11.33 20.4728 10.8032 19.823 10.8032C19.1733 10.8032 18.6461 11.33 18.6461 11.9801V20.0262C18.6461 20.9193 17.9197 21.6461 17.0262 21.6461H3.9738C3.08035 21.6461 2.35394 20.9193 2.35394 20.0262V6.9738C2.35394 6.08073 3.08035 5.35394 3.9738 5.35394H12.0202C12.67 5.35394 13.1972 4.82713 13.1972 4.17697C13.1972 3.5268 12.67 3 12.0202 3H3.9738C1.78231 3 0 4.78269 0 6.9738V20.0262C0 22.2173 1.78231 24 3.9738 24Z" fill="#FE5F55" />
                </svg>
                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setDeleteNote(true)}>
                    <path d="M1.14286 18.6667C1.14286 19.95 2.17143 21 3.42857 21H12.5714C13.8286 21 14.8571 19.95 14.8571 18.6667V7C14.8571 5.71667 13.8286 4.66667 12.5714 4.66667H3.42857C2.17143 4.66667 1.14286 5.71667 1.14286 7V18.6667ZM4.76571 9.53167C5.21143 9.07667 5.93143 9.07667 6.37714 9.53167L8 11.1883L9.62286 9.53167C10.0686 9.07667 10.7886 9.07667 11.2343 9.53167C11.68 9.98667 11.68 10.7217 11.2343 11.1767L9.61143 12.8333L11.2343 14.49C11.68 14.945 11.68 15.68 11.2343 16.135C10.7886 16.59 10.0686 16.59 9.62286 16.135L8 14.4783L6.37714 16.135C5.93143 16.59 5.21143 16.59 4.76571 16.135C4.32 15.68 4.32 14.945 4.76571 14.49L6.38857 12.8333L4.76571 11.1767C4.32 10.7333 4.32 9.98667 4.76571 9.53167ZM12 1.16667L11.1886 0.338333C10.9829 0.128333 10.6857 0 10.3886 0H5.61143C5.31429 0 5.01714 0.128333 4.81143 0.338333L4 1.16667H1.14286C0.514286 1.16667 0 1.69167 0 2.33333C0 2.975 0.514286 3.5 1.14286 3.5H14.8571C15.4857 3.5 16 2.975 16 2.33333C16 1.69167 15.4857 1.16667 14.8571 1.16667H12Z" fill="#FE5F55" />
                </svg>
            </div>
        </div>
    )
}

const DeleteNote = ({ deleteNote, setDeleteNote, value, user }) => {
    const handleDelete = (value) => {
        var data = db.collection("USERS_BUMAGO").doc(user.email);
        data.update({
            notes: firebase.firestore.FieldValue.arrayRemove(value)
        })
    }
    return (
        <div className={(deleteNote) ? "delete__note__section flex__center__vert visible" : "delete__note__section flex__center__vert"}>
            <h1 className="font1">Delete Note<span>.</span></h1>
            <div className="button__section flex__center">
                <button onClick={() => { setDeleteNote(false); handleDelete(value) }}>Yes</button>
                <button onClick={() => setDeleteNote(false)}>No</button>
            </div>
        </div>
    )
}

const EditNote = ({ value, editNote, setEditNote, user }) => {
    const [text, setText] = useState(value);
    const handleUpdate = (text) => {
        var data = db.collection("USERS_BUMAGO").doc(user.email);
        data.update({ notes: firebase.firestore.FieldValue.arrayUnion(text) })
        data.update({ notes: firebase.firestore.FieldValue.arrayRemove(value) })
    }
    return (
        <div className={(editNote) ? "edit__note__section flex__center__vert visible" : "edit__note__section flex__center__vert"}>
            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(45deg)', position: 'fixed', top: '2.5%', right: '2.5%', cursor: 'pointer' }} onClick={() => setEditNote(false)}>
                <path d="M28 13H2C0.89543 13 0 13.8954 0 15C0 16.1046 0.89543 17 2 17H28C29.1046 17 30 16.1046 30 15C30 13.8954 29.1046 13 28 13Z" fill="#FE5F55" />
                <path d="M17 28V2C17 0.89543 16.1046 0 15 0C13.8954 0 13 0.89543 13 2L13 28C13 29.1046 13.8954 30 15 30C16.1046 30 17 29.1046 17 28Z" fill="#FE5F55" />
            </svg>
            <h1 className="font1">Edit Note<span>.</span></h1>
            <input value={text} onChange={(e) => setText(e.target.value)}></input>
            <button onClick={() => { handleUpdate(text); setEditNote(false); }}>Save</button>
        </div>
    )
}

export default Note
