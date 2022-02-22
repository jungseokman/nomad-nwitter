import { dbService, storageService } from "fBase";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetText = doc(dbService, "nweets", `${nweetObj.id}`)

    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하길원해?")
        if(ok) {
            await deleteDoc(NweetText)
            if (nweetObj.attachmentUrl){
                const urlRef = ref(storageService, nweetObj.attachmentUrl);
                await deleteObject(urlRef);
            }
            
        }

    }
    const toggleEditing = () => setEditing(prev => !prev)
    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(NweetText, {
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewNweet(value);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form>
                        <input type="text" placeholder="Edit your nweet" required onChange={onChange} value={newNweet}/>
                        <input type="submit" value="Update Nweet" onClick={onSubmit} />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <li>{nweetObj.text}</li>
                    {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} width="50px" height="50px" />)}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Nweet