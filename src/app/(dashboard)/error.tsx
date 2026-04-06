'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function GlobalError({error} : {error : Error}) { 
    const router = useRouter();
    useEffect(()=> {
        if(error.message.includes('expired')) { 
            setTimeout(()=> 
            router.push("/login"),  2000)
        }
    }, [error, router])
   return (
        <div className="p-10 border-2 border-red-500 bg-red-50 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-red-700">Đã có lỗi xảy ra!</h2>
            
            {/* Hiển thị cái message "JWT is expired" từ Java ném sang */}
            <p className="text-gray-700 my-4">{error.message}</p>

            <div className="flex gap-4 justify-center">
                <button 
                    onClick={() => window.location.reload()} 
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Thử lại
                </button>
                
                {error.message.includes("expired") && (
                    <button 
                        onClick={() => router.push('/login')}
                        className="border border-red-600 text-red-600 px-4 py-2 rounded"
                    >
                        Đăng nhập lại
                    </button>
                )}
            </div>
        </div>
    );
}