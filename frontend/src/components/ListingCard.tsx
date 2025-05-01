function ListingCard({ id, imageUrl, title, price }: propTypes) {
    return (
        <div
            // onClick={handleClick}
            className="cursor-pointer rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden inline-block"
        >
            <img
                src={imageUrl}
                alt={title}
                className="h-auto w-full object-cover"
            />
            <div className="flex flex-col items-center">
                <p className="text-lg font-semibold truncate">{title}</p>
                <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
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
