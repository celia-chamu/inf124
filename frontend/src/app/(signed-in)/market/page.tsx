import ListingCard from "@/components/ListingCard";

export default function Page() {
    return (
        <>
            <div className="m-4">
            <ListingCard id="1" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            <ListingCard id="2" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            <ListingCard id="3" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            <ListingCard id="4" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            <ListingCard id="5" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            <ListingCard id="6" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            <ListingCard id="7" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
            </div>
        </>
    );
}