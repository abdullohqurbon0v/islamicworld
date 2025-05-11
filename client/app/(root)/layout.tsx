'use client'
import { $axios } from "@/api/axios";
import { useUserStore } from "@/store/user-store";
import { ChildProps, UserType } from "@/types";
import { useEffect } from "react";
import Navbar from "./_components/navbar";

interface GetUserResponse {
    user: UserType
    message: string
}

const Layout = ({ children }: ChildProps) => {
    const { setUser, setToken } = useUserStore()

    useEffect(() => {
        const getUserInfo = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    const res = await $axios.get<GetUserResponse>('/user/profile')
                    setToken(token)
                    setUser(res.data.user)
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("No auth")
                return
            }
        }
        if (typeof window !== 'undefined') getUserInfo()
    }, [])

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
