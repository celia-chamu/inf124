import Message from "@/components/Message"
import {Button} from "@/components/ui/button"

function Inbox() {
    return (
        <div className="flex flex-col">
            <div className="bg-gray-500 mt-4 p-4 gap-8 flex items-center">
                <Button className="rounded-2x1 border-1 cursor-pointer">Buyers</Button>
                <Button className="rounded-2x1 border-1 cursor-pointer">Sellers</Button>
            </div>

            <div className="bg-gray-500 mt-4 p-8 h-180">
                <Message username="Username" textMessage="Text Message"/>
                <Message username="Username" textMessage="Text Message"/>
            </div>
        </div>
    );
}

export default Inbox