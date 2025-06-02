function ListingCard({ id, imageUrl, title, price }: propTypes) {
    return (
        <div
            // onClick={handleClick}
            className="cursor-pointer rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden inline-block w-full h-full bg-white"
        >
            <img
                src={imageUrl}
                alt={title}
                className="h-auto w-full object-cover"
            />
            <div className="flex flex-col m-2">
                <p className="text-lg font-semibold line-clamp-2 text-center">{title}</p>
                <p className="text-black mt-1 text-center">${price.toFixed(2)}</p>
            </div>
        </div>
    )
}

type propTypes = {
    id: string
    imageUrl: string
    title: string
    price: number
}

export default ListingCard
