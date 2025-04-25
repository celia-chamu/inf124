import {Button} from "@/components/ui/button"

function CreateListing() {
    return (
        <div>
            <div className="bg-gray-500 mt-4 p-4 gap-8 flex items-center">
                <Button className="rounded-2x1 border-1 cursor-pointer">Buyers</Button>
                <Button className="rounded-2x1 border-1 cursor-pointer">Sellers</Button>
            </div>
        </div>
    );
}

export default CreateListing