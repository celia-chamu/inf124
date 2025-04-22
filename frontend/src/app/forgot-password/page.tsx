import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react";
export default function Login(){
    return(
        <div className="flex items-center justify-center h-full w-full mt-30">
            <form className= "h-auto w-auto">
                <h1 className="flex justify-center items-center text-3xl sm:text-5xl p-10 order-8">Forgot Password?</h1>
                <div className="relative w-full p-2">
                    <input className="flex border-2 w-full rounded-3xl h-10 pl-3 pr-7" placeholder="UCI Email" type="text" required />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                </div>
                <div className="flex justify-center items-center p-4 pb-6">
                    <Button className="w-full rounded-3xl">Confirm</Button>
                </div>
                <div className="flex items-center justify-center">
                    <p className="pr-0.5">Don't have an account?</p>
                    <a className="text-blue-800 underline" href="/signup">Register</a>
                </div>
            </form>
        </div>
    )
}