import React, {useState} from 'react';
import app from './firebase';
function Fetch()
{
    const[allDocs, setalldocs]= useState([])
    const db = app.firestore();

    function fetchAll(e){
    e.preventDefault();
    db.Collection("email")
    .get()
    .then((snapshot)=>{
        if(snapshot.docs.length>0){
            snapshot.docs.forEach((doc)=>
            {
                setalldocs((prev)=>
                {
                    return[...prev,doc.data()];
                });
            });
        }
    });

}


return(
    <div>Fetch
<button onClick={fetchAll}>fetch all</button>



    </div>
)
}
export default Fetch;