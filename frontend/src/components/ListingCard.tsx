function ListingCard({ id, image, title, price }: propTypes) {
    return (
        <div
            // onClick={handleClick}
            className="cursor-pointer rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden inline-block w-full h-full bg-white"
        >
            <div className="h-50 w-full">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col m-2">
                <p className="text-lg font-semibold line-clamp-2 text-center">
                    {title}
                </p>
                <p className="text-black mt-1 text-center">
                    ${price.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

type propTypes = {
    id: string
    image: string
    title: string
    price: number
}

export default ListingCard
