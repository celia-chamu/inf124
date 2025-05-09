export interface listingType {
    id: string
    images: image[]
    title: string
    price: number
    owner: string
}

export interface image {
    url: string
}

const listings = [
    {
        id: '1',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/gullaberg-6-drawer-dresser-white__1191200_pe900554_s5.jpg?f=xl',
            },
        ],
        title: 'GULLABERG 6-drawer dresser',
        price: 4.49,
        owner: 'iquon@uci.edu',
    },
    {
        id: '2',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/pildvaergmal-duvet-cover-and-pillowcase-s-white-floral-pattern__1385328_pe963277_s5.jpg?f=xl',
            },
        ],
        title: 'PILDVÄRGMAL',
        price: 39.99,
        owner: 'iquon@uci.edu',
    },
    {
        id: '3',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/aktertofter-led-ceiling-fan-with-light-dimmable-wood-effect-silver-color__1385438_pe963313_s5.jpg?f=xl',
            },
        ],
        title: 'AKTERTOFTER',
        price: 129.99,
        owner: 'iquon@uci.edu',
    },
    {
        id: '4',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/kvarnven-ergonomic-pillow-stomach-sleeper__1024077_pe833412_s5.jpg?f=xl',
            },
        ],
        title: 'KVARNVEN',
        price: 49.99,
        owner: 'cchamuma@uci.edu',
    },
    {
        id: '5',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/storklinta-6-drawer-chest-dark-brown-oak-effect-anchor-unlock-function__1344142_pe949751_s5.jpg?f=xl',
            },
        ],
        title: 'STORKLINTA',
        price: 229.99,
        owner: 'cchamuma@uci.edu',
    },
    {
        id: '6',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/gullaberg-6-drawer-dresser-white__1191200_pe900554_s5.jpg?f=xl',
            },
        ],
        title: 'GULLABERG 6-drawer dresser',
        price: 4.49,
        owner: 'ewtruong@uci.edu',
    },
    {
        id: '7',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/pildvaergmal-duvet-cover-and-pillowcase-s-white-floral-pattern__1385328_pe963277_s5.jpg?f=xl',
            },
        ],
        title: 'PILDVÄRGMAL',
        price: 39.99,
        owner: 'ewtruong@uci.edu',
    },
    {
        id: '8',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/aktertofter-led-ceiling-fan-with-light-dimmable-wood-effect-silver-color__1385438_pe963313_s5.jpg?f=xl',
            },
        ],
        title: 'AKTERTOFTER',
        price: 129.99,
        owner: 'ewtruong@uci.edu',
    },
    {
        id: '9',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/kvarnven-ergonomic-pillow-stomach-sleeper__1024077_pe833412_s5.jpg?f=xl',
            },
        ],
        title: 'KVARNVEN',
        price: 49.99,
        owner: 'rudyx@uci.edu',
    },
    {
        id: '10',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/storklinta-6-drawer-chest-dark-brown-oak-effect-anchor-unlock-function__1344142_pe949751_s5.jpg?f=xl',
            },
        ],
        title: 'STORKLINTA',
        price: 229.99,
        owner: 'rudyx@uci.edu',
    },
]

const owners = [
    {
        email: 'iquon@uci.edu',
    },
    {
        email: 'cchamuma@uci.edu',
    },
    {
        email: 'ewtruong@uci.edu',
    },
    {
        email: 'rudyx@uci.edu',
    },
]

export function fetchListings() {
    return listings
}

export function fetchListing(id: string): listingType | undefined {
    for (const item of listings) {
        if (item.id == id) {
            return item
        }
    }
}
