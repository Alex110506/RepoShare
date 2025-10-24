import React, { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PostCardProfile from '../components/PostCardProfile'

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "/api"

const ProfilePage = () => {

    const navigate=useNavigate()

    const {logout}=useContext(AuthContext)

    const [edit,setEdit]=React.useState(false)

    const [userData,setUserData]=React.useState({
        fullName:"",
        email:"",
        profilePic:"",
        bio:"",
        university:"",
        location:"",
        linkGit:""
    })
    const [userPosts,setUserPosts]=React.useState([])

    const [loading,setLoading]=React.useState(true)

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/auth/me`,{
                credentials: "include",
            });

            if(!res.ok) throw new Error("Failed to fetch user data");

            const data = await res.json();
            setUserData(data.user);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    const handleuserEdit= async ()=>{
        try {
            const res=await fetch(`${BASE_URL}/auth/edit`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName:userData.fullName,
                    email:userData.email,
                    location:userData.location,
                    university:userData.university,
                    linkGit:userData.linkGit
                }),
                credentials:"include"
            })

            if(!res.ok)
                toast.error("Failed to edit profile.")

            const data=await res.json()
            toast.success("Updated user successfully.")
        } catch (error) {
            toast.error(error)
            console.error(error);
        }
    }

    const fetchUserPosts=async ()=>{
        try {
            setLoading(true)
            const res=await fetch(`${BASE_URL}/post/getMyPosts`,{
                credentials:"include"
            })
            if(!res.ok){
                toast("Failed to fetch user posts")
            }

            const data=await res.json()
            setUserPosts(data.posts)
        } catch (error) {
            toast(error)
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    const handleLogout=async ()=>{
        logout()
        navigate("/")
    }

    console.log(userPosts);

    React.useEffect(()=>{
        fetchUserData()
        fetchUserPosts()
    },[])

    const postCards=userPosts.map((item)=>{
        return (
            <PostCardProfile
                key={item._id}
                postId={item._id}
                image={item.projectImage}
                githubLink={item.githubLink}
                description={item.description}
                fullName={userData.fullName}
                userId={item.user}
                profilePic={userData.profilePic}
                university={userData.university}
                location={userData.location}
            >

            </PostCardProfile>
        )
    })

  return (
    <div className='flex flex-col justify-center items-center py-8 gap-8'>
        <div className='flex flex-row gap-4 p-6 bg-base-300 rounded-xl mx-4'>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <img src={userData.profilePic} alt='profile pic' className='w-28 h-28'></img>
                <button onClick={handleLogout} className='btn bg-secondary p-4 text-lg font-bold'>Logout</button>
            </div>
            <div className='flex flex-col gap-2'>
                <input
                    type="text"
                    className="w-full bg-transparent text-2xl"
                    value={`${userData.fullName}`}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                />
                <input
                    type="text"
                    className="w-full bg-transparent text-xl"
                    value={`${userData.email}`}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <input
                    type="text"
                    className="w-full bg-transparent text-md"
                    value={`${userData.location}`}
                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                />
                <input
                    type="text"
                    className="w-full bg-transparent text-md"
                    value={`${userData.university}`}
                    onChange={(e) => setUserData({ ...userData, university: e.target.value })}
                />
                {
                    !edit ? 
                        <p className='text-md'><a href={userData.linkGit}>{userData.linkGit}</a></p>
                    :
                    <input
                        type="text"
                        className="w-full bg-transparent text-md"
                        value={`${userData.linkGit}`}
                        onChange={(e) => setUserData({ ...userData, linkGit: e.target.value })}
                    />
                }
                
                <button
                    className='btn bg-accent text-lg p-1 font-bold'
                    onClick={()=>{
                        setEdit(edit ? false : true)
                        if(edit)
                            handleuserEdit()
                    }}
                >
                    {edit ? "Save Changes" : "Edit Profile"}
                </button>
            </div>
        </div>
        <div className='flex flex-col justify-start items-start mx-4'>
            <h1 className='text-3xl'>Bio:</h1>
            <p>{userData.bio}</p>
        </div>
        <hr className='w-[95vw] md:w-1/3'></hr>
        <div className='flex flex-col'>
            <h1 className='text-3xl pl-2 mb-4'>Posts:</h1>
            <div className={`flex flex-wrap justify-center gap-6 ${
                userPosts.length === 1 ? "items-center justify-center min-h-[70vh]" : "justify-start"
            }`}>
                {postCards}
            </div>
        </div>
    </div>
  )
}

export default ProfilePage