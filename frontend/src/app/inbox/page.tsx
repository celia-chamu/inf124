import NavMenu from "@/components/NavMenu"
import Message from "@/components/Message"
import {Button} from "@/components/ui/Button"

function Inbox() {
    return (
        <>
            <NavMenu/>

            <div className="bg-gray-500 ml-82 w-320 h-16 mt-4 pl-4 gap-8 flex items-center">
                <Button className="rounded-2x1 border-1 cursor-pointer">Buyers</Button>
                <Button className="rounded-2x1 border-1 cursor-pointer">Sellers</Button>
            </div>

            <div className="bg-gray-500 ml-82 w-320 h-186 mt-4 pt-4 pl-8">
                <Message username="Username" textMessage="Text Message"/>
                <Message username="Username" textMessage="Text Message"/>
            </div>
        </>
    );
}

export default Inbox