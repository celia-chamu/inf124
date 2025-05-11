import Link from 'next/link'
import Image from 'next/image'

export default function MobileHeader() {
    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center bg-primary">
            <div className="ml-5 justify-center">
                <Link href="/market">
                    <Image
                        src="/images/ZotMarket.png"
                        alt="ZotMarket Logo"
                        width={120}
                        height={20}
                        className=" object-contain"
                    />
                </Link>
            </div>
        </nav>
    )
}
