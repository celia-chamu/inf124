import Link from 'next/link'
import GoogleSignIn from '@/components/google/GoogleSignIn'

export default function Header() {
    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-cyan-950">
            <div className="ml-5">
                <Link href="/">
                    <p className="text-3xl text-yellow-500">ZotMarket</p>
                </Link>
            </div>
            <div className="mr-5">
                <GoogleSignIn />
            </div>
        </nav>
    )
}
