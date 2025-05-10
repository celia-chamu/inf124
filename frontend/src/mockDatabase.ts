enum categories {
    furniture = 'Furniture',
    school = 'School',
    tech = 'Tech',
    other = 'Other',
}

enum condition {
    preowned = 'Pre-Owned',
    likenew = 'Like New',
    new = 'New',
}

export interface listingType {
    id: string
    images: image[]
    title: string
    price: number
    owner: string
    category: categories
    condition: condition
    description: string
}

export interface ownerType {
    images: image[]
    name: string
    email: string
    joined: string
}

export interface image {
    url: string
}

const filters = ['Cars', 'Chicken', 'Desks', 'Lab', 'Coke']

const listings = [
    {
        id: '1',
        images: [
            {
                url: 'https://www.ikea.com/us/en/images/products/gullaberg-6-drawer-dresser-white-anchor-unlock-function__1283779_pe932633_s5.jpg?f=xl',
            },
            {
                url: 'https://www.ikea.com/us/en/images/products/gullaberg-6-drawer-dresser-white-anchor-unlock-function__1403696_pe969671_s5.jpg?f=xl',
            },
        ],
        title: 'GULLABERG 6-drawer dresser',
        price: 4.49,
        owner: 'iquon@uci.edu',
        category: categories.furniture,
        condition: condition.likenew,
        description: 'Description 1',
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
        category: categories.furniture,
        condition: condition.new,
        description: 'Description 2',
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
        category: categories.furniture,
        condition: condition.likenew,
        description: 'Description 3',
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
        category: categories.furniture,
        condition: condition.preowned,
        description: 'Description 4',
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
        category: categories.furniture,
        condition: condition.likenew,
        description: 'Description 5',
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
        category: categories.furniture,
        condition: condition.preowned,
        description: 'Description 6',
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
        category: categories.furniture,
        condition: condition.likenew,
        description: 'Description 7',
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
        category: categories.furniture,
        condition: condition.likenew,
        description: 'Description 8',
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
        category: categories.other,
        condition: condition.new,
        description: 'Description 9',
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
        category: categories.furniture,
        condition: condition.likenew,
        description: 'Description 10',
    },
]

const owners = [
    {
        images: [
            {
                url: 'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg',
            },
        ],
        name: 'Ivan Quon',
        email: 'iquon@uci.edu',
        joined: '2023-10-01',
    },
    {
        images: [
            {
                url: 'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg',
            },
        ],
        name: 'Celia Chamu',
        email: 'cchamuma@uci.edu',
        joined: '2022-10-01',
    },
    {
        images: [
            {
                url: 'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg',
            },
        ],
        name: 'Eric Truong',
        email: 'ewtruong@uci.edu',
        joined: '2024-10-01',
    },
    {
        images: [
            {
                url: 'https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg',
            },
        ],
        name: 'Rudy Xie',
        email: 'rudyx@uci.edu',
        joined: '2025-10-01',
    },
]

const messages = [
    {
        sender: "iquon@uci.edu",
        receiver: "ewtruong@uci.edu",
        messages: [{
            sender: "iquon@uci.edu" ,
            text: "Hi im interested",
        }]
    }, 
    {
        sender: "iquon@uci.edu",
        receiver: "rudyx@uci.edu",
        messages: [{
            sender: "iquon@uci.edu" ,
            text: "Hi im interested",
        }]
    }, 
    {
        sender: "rudyx@uci.edu",
        receiver: "iquon@uci.edu",
        messages: [{
            sender: "rudyx@uci.edu" ,
            text: "Hi im interested",
        }]
    }, 
]

export function fetchListings() {
    return listings
}

export function fetchListingsByOwner(email: string): listingType[] {
    return listings.filter((listing) => listing.owner === email)
}

export function fetchOwnerByEmail(email: string): ownerType | undefined {
    return owners.find((owner) => owner.email === email)
}
export function fetchFilters() {
    return filters
}

export function fetchListing(id: string): listingType | undefined {
    for (const item of listings) {
        if (item.id == id) {
            return item
        }
    }
}

export function fetchBuyers(email: string) {
    return messages.filter((chat) => chat.receiver === email)
}

export function fetchSellers(email: string) {
    return messages.filter((chat) => chat.sender === email)
}