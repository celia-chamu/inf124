import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/searchbar";

export default function Page() {
    return (
        <div className="w-auto h-auto flex flex-col grow gap-4">
            <SearchBar/>
            <div className="flex flex-col md:flex-row gap-4 md:flex-wrap">
                <ListingCard id="1" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="2" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="3" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="4" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="5" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="6" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="7" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="8" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                <ListingCard id="9" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            </div>
        </div>
    );
}