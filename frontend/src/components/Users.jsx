import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"

export const Users = () => {
    // Replace with backend call
    const [Users, setUsers] = useState([]);

     useEffect(()=>{
          axios.get("http://localhost:3000/api/v1/user/bulk")
                .then(res=>{
                    console.log("Response data:",res.data.users);
                    console.log(typeof(res.data.users));
                   const a= console.log(Object.entries(res.data.users));
                    if(Array.isArray(a)){
                    setUsers(res.data.user)
                    }else{
                        console.error("Unexpected response format:", res.data);
                    }
                })
     },[])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {Users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} />
        </div>
    </div>
}