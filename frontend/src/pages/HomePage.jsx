import React, { useContext } from 'react'
import NewsletterPopup from '../components/Newsletter'
import { AuthContext } from '../components/AuthContext'
import toast from 'react-hot-toast'
import PostCard from '../components/PostCard'

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "/api"

const HomePage = () => {

    const {user}=useContext(AuthContext)

    const [posts,setPosts]=React.useState([])
    const [location,setLocation]=React.useState("")
    const [page,setPage]=React.useState(1)

    const getPosts=async (location, page=1)=>{
        try {
            const loc = location || "all";
            const res = await fetch(`${BASE_URL}/post/getRecentPosts/${loc}?page=${page}`);

            const data = await res.json();

            if (res.ok) {
                setPosts(data.posts)
                console.log("Posts:", data.posts);
            } else {
                toast.error(`Error fetching posts:, ${data.message}`);
            }
        } catch (error) {
            toast.error("Network or server error:");
        }
    }

    React.useEffect(()=>{
        getPosts("",1)
    },[])

    const postCards=posts.map((item)=>{
        return(<PostCard
            key={item._id}
            postId={item._id}
            image={item.projectImage}
            githubLink={item.githubLink}
            description={item.description}
            fullName={item.user.fullName}
            userId={item.user._id}
            profilePic={item.user.profilePic}
            university={item.user.university}
            location={item.user.location}
        >

        </PostCard>)
    })

    const handleLoadPosts =async ()=>{
        const pg=page
        setPage(pg+1);
        try {
            
        } catch (error) {
            
        }
    }

  return (
    <div className='flex flex-col justify-center items-center p-6 gap-8'>
        <NewsletterPopup email={user}></NewsletterPopup>
        <h1 className='font-bold text-3xl'>My Feed</h1>
        <div className="flex flex-row gap-2 justify-center">
            <input
                type="text"
                placeholder="Search by location..."
                className="input w-80 md:w-96 pl-4 bg-base-200"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
            />
            <button className='btn bg-base-200 w-12 hover:bg-accent' onClick={()=>getPosts(location,1)}>
                <i className="bi bi-search"></i>
            </button>
        </div>
        <div className={`flex flex-wrap justify-center gap-6 ${
                posts.length === 1 ? "items-center justify-center min-h-[70vh]" : "justify-start"
            }`}>
            {postCards}
        </div>
        <div className='flex flex-row gap-2'>
            <button disabled={page>1 ? false : true} className='btn bg-base-300 p-7 hover:bg-accent' onClick={()=>{
                setPage(page-1)
                getPosts(location,page)
            }}>Go to Previous</button>
            <button className='btn bg-base-300 p-7 hover:bg-accent' onClick={()=>{
                setPage(page+1)
                getPosts(location,page)
            }}>Load More</button>
        </div>
    </div>
  )
}

export default HomePage
