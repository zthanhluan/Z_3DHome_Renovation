import React, {UseState} from 'react';
import app from './firebase';
function fetch()
{
    const[allDocs, setalldocs]= UseState([])
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
export default fetch;