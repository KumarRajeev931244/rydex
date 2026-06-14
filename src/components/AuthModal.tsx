"use client"
import React, { useState } from 'react'
import {AnimatePresence, easeOut, motion} from 'motion/react'
import { Lock, Mail, User, X } from 'lucide-react'
import Image from 'next/image'

type propType={
    open:boolean,
    onClose:() => void
}
type stepType = "login" | "signup" | "otp"
function AuthModal({open,onClose}:propType){
    const [step, setStep] = useState<stepType>("login")
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    return(
        <AnimatePresence>
        {open && (
            <>
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            // onClick={onClose}
            className='fixed inset-0 z-90 bg-black/80 backdrop-blur-md'
            >
                <motion.div
                initial={{opacity:0, scale:0.95, y:40}}
                animate={{opacity:1, scale:1, y:0}}
                transition={{duration:0.35, ease:easeOut}}
                className='fixed inset-0 z-100 flex items-center justify-center px-4'
                >
                    <div className='relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black'>
                    <div className='absolute right-4 top-4 text-gray-500 hover:text-bl transition cursor-pointer' onClick={onClose}>
                        <X size={20}/>
                    </div>
                    <div className='mb-6 text-center'>
                        <h1 className='text-3xl font-extrabold tracking-widest'>RYDEX</h1>
                        <p className='mt-1 text-xs text-gray-500'>Premium Vehicle Booking</p>
                    </div>
                    {/* button */}
                    <button
                    className='w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition cursor-pointer'>
                        <Image src={'/google.png'} alt='google' width={20} height={20}/>
                        Continue with google

                    </button>
                    {/* divider */}
                    <div className='flex items-center gap-4 my-6'> 
                        <div className='flex-1 h-px bg-black/10'></div>
                        <div className='text-xs text-gray-500'>OR</div>
                        <div className='flex-1 h-px bg-black/10'></div>
                    </div>

                   <div>
                    {/* login */}
                     {step == "login" && (
                        <motion.div
                        initial={{opacity:0, x:20}}
                        animate={{opacity:1,x:0}}
                        exit={{opacity:0, x:20}}
                        >
                            <h1 className="text-xl font-semibold">Welcome Back</h1>
                            <div className='mt-5 space-y-4'>
                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                    <Mail size={18} className='text-gray-500'/>
                                    <input type="text" placeholder='email' className='w-full bg-transparent outline-none text-sm'
                                    onChange={(e)=>setEmail(e.target.value)} 
                                    value={email}
                                    />
                                </div>
                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                    <Lock size={18} className='text-gray-500'/>
                                    <input type="password" placeholder='password' className='w-full bg-transparent outline-none text-sm'
                                    onChange={(e)=>setEmail(e.target.value)} 
                                    value={email}
                                    />
                                </div>
                                <button className='w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 cursor-pointer'>Login</button>
                            </div>
                            <p className='mt-6 text-center text-sm text-gray-500'>Don't have account? <div onClick={()=> setStep("signup")} className='text-black font-medium hover:underline cursor-pointer'>Sign Up</div></p>

                        </motion.div>
                    )}
                    {/* signup */}
                    {step == "signup" && (
                        <motion.div
                        initial={{opacity:0, x:20}}
                        animate={{opacity:1,x:0}}
                        exit={{opacity:0, x:20}}
                        >
                            <h1 className="text-xl font-semibold">Create Account</h1>
                            <div className='mt-5 space-y-4'>
                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                    <User size={18} className='text-gray-500'/>
                                    <input type="text" placeholder='Full Name' className='w-full bg-transparent outline-none text-sm'/>
                                </div>
                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                    <Mail size={18} className='text-gray-500'/>
                                    <input type="text" placeholder='email' className='w-full bg-transparent outline-none text-sm'/>
                                </div>
                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                    <Lock size={18} className='text-gray-500'/>
                                    <input type="password" placeholder='password' className='w-full bg-transparent outline-none text-sm'/>
                                </div>
                                <button className='w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 cursor-pointer'>Sign up</button>
                            </div>
                            <p className='mt-6 text-center text-sm text-gray-500'>Already have account? <div onClick={()=> setStep("login")} className='text-black font-medium hover:underline cursor-pointer'>Login</div></p>

                        </motion.div>
                    )}
                   </div>








                
                    </div>

                    

                </motion.div>

            </motion.div>
            </>
        )
            
        }
        </AnimatePresence>
        
        
    )
}

export default AuthModal