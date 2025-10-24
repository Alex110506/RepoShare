import React from 'react'
import toast from 'react-hot-toast';

const CreatePostPage = () => {

    const [postData,setPostData]=React.useState({
        image:null,
        githubLink:"",
        description:"",
        user:"",
        file:null
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPostData(prev => ({ ...prev, image: imageUrl ,file:file}))
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (!postData.image) {
            toast("Please select an image to upload.");
            return;
        }
        const formData = new FormData();
        formData.append("image", postData.file);
        formData.append("githubLink", postData.githubLink);
        formData.append("description", postData.description);
        try {
            const res=await fetch("http://localhost:5001/api/post/createPost", {
                method: "POST",
                body: formData,
                credentials:"include"
            })

            const data=await res.json();
            if(res.ok){
                toast.success("Post uploaded successfully")
                setPostData({
                    image:null,
                    githubLink:"",
                    description:"",
                    user:"",
                    file:null
                })
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            
        }
        console.log("Uploading image:", postData.image);
    };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 p-4">
        <div className="flex flex-col gap-4 justify-center items-center">
            {postData.image ? (
                <img
                    src={postData.image}
                    alt="post preview"
                    className="w-96 h-96 rounded-lg shadow-lg object-cover"
                />
            ) : (
                <div className="max-w-md h-96 w-96 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">Image preview will appear here</span>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full max-w-md"
            />
            
        </div>
        <div className='flex flex-col gap-8 w-96'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl'>Repository Link:</h2>
                <input type="text" className='input bg-base-300 w-full p-2'
                    value={postData.githubLink}
                    onChange={(e)=>{setPostData({...postData,githubLink:e.target.value})}}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl'>Description:</h2>
                <textarea
                    placeholder="Write a description..."
                    className=" pl-2 textarea textarea-bordered w-full bg-base-300 max-w-md h-32"
                    name="description"
                    value={postData.description}
                    onChange={(e)=>{setPostData({...postData,description:e.target.value})}}
                />
            </div>
            <button
                onClick={handleSubmit}
                className="btn btn-primary mt-2 w-full max-w-md bg-secondary font-bold"
            >
                Upload Post
            </button>
        </div>
        
    </div>
  )
}

export default CreatePostPage