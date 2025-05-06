import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { Filter } from 'lucide-react'

export default function SearchBar() {
    return (
        <div className='flex content-center'>
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    className="pl-10 rounded-xl h-auto w-full"
                    placeholder="Search"
                />
            </div>
            <Filter className='h-full w-6'/>
        </div>
    )
}
