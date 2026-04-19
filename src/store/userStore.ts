import { create } from "zustand";
type User = { 
    userId :number , 
    userName : string , useUserStore = create<UserStore>((set) => ({
    user : null  , 
    setUser : (user)=> set({user})  , 
    clearUser : () => set({user : null} )
}))