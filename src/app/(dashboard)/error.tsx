'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {

    const router = useRouter();
    const isExpired = error.message.includes('expired') || error.message.includes('invalid');


    return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white border border-red-100 shadow-2xl shadow-red-100/50 rounded-2xl overflow-hidden transition-all">
                <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full  animate-pulse" />
                    <span className="text-red-800 font-semibold text-sm uppercase tracking-wider">System Alert</span>
                </div>

                <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <i className="fa-solid fa-triangle-exclamation fa-2xl" style={{color : 'rgb(233, 50, 50)'}}></i>
                    </div>

                    <h2 className="text-m font-bold text-gray-900 mb-2">
                        {isExpired ? "Login session is expired" : "An error has occurred!"}
                    </h2>
                    
                    <p className="text-gray-500 text-l mb-8 leading-relaxed">
                        {error.message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                            onClick={() => window.location.reload()} 
                            className="btn btn-primary"
                        >
                            Try again
                        </button>
                        
                        {isExpired && (
                            <button 
                                onClick={() => router.push('/login')}
                                className="btn btn-danger"
                            >
                                Login now
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}