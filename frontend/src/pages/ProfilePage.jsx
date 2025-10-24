import React, { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PostCardProfile from '../components/PostCardProfile'

const ProfilePage = () => {

    const navigate=useNavigate()

    const {logout}=useContext(AuthContext)

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
            const res = await fetch("http://localhost:5001/api/auth/me",{
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

    const fetchUserPosts=async ()=>{
        try {
            setLoading(true)
            const res=await fetch("http://localhost:5001/api/post/getMyPosts",{
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
                <h1 className='text-2xl'>Full Name: {userData.fullName}</h1>
                <h2 className='text-xl'>Email: {userData.email}</h2>
                <p className='text-md'>City: {userData.location}</p>
                <p className='text-md'>University: {userData.university}</p>
                <p className='text-md'>Github: <a href={userData.linkGit}>{userData.linkGit}</a></p>
            </div>
        </div>
        <div className='flex flex-col justify-start items-start'>
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