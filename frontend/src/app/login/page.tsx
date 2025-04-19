import { Button } from "@/components/ui/Button"
import { User } from 'lucide-react';
import { KeyRound } from "lucide-react";
export default function Login(){
    return(
        <div className="flex items-center justify-center h-screen w-screen">
            <form className= "h-3/5 w-1/4">
                <h1 className="flex justify-center items-center text-5xl p-10 order-8">ZotMarket</h1>
                <div className="relative w-full p-2">
                    <input className="flex border-2 w-full rounded-3xl h-10 pl-3 pr-7" placeholder="UCI Email..." type="text" required />
                    <User className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                </div>
                <div className="relative w-full p-2">
                    <input className="flex border-2 w-full rounded-3xl h-10 pl-3 pr-7" placeholder="Password..." type="text" required/>
                    <KeyRound className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                </div>
                <div>
                    <input className="ml-4 mr-1"type="checkbox" />
                    <label className="mr-30">Remember Me</label>
                    <a className="text-blue-800 underline mr-1"href="">Forgot password?</a>
                </div>
                <div className="flex justify-center items-center p-4 pb-6">
                    <Button className="w-full rounded-3xl">Confirm</Button>
                </div>
                <div className="flex items-center justify-center">
                    <p className="pr-0.5">Don't have an account?</p>
                    <a className="text-blue-800 underline" href="">Register</a>
                </div>
            </form>
        </div>
    )
}