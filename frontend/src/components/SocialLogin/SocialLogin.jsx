import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

function SocialLogin() {
    const { userGoogleLogin } = useAuth();
    const axiosPublic =useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogle = () => {
        userGoogleLogin()
            .then((result) => {
                const userInfo={
                    email: result.user?.email,
                    name:result.user?.displayName
                }
                axiosPublic.post('/users',userInfo)
                .then((res)=>{
                     console.log(res.data)
                     navigate('/')
                })
                
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div className='flex flex-col justify-center items-center gap-3 pb-5'>

            <h2 className='text-xl font-medium '>Or sign in with</h2>
            <div className='flex gap-5 '>
                <button onClick={handleGoogle} className="btn btn-circle">
                    <FaGoogle></FaGoogle>
                </button>
                <button className="btn btn-circle">
                    <FaGithub></FaGithub>
                </button>
            </div>
        </div>
    )
}

export default SocialLogin