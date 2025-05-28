import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
    const session = await getServerSession(authOptions)
    
    if (session) {
        redirect('/market')
    }

    return (
        <div className="h-200 flex items-center justify-center bg-background">
            <div className="rounded-xl border border-border bg-white shadow-xl p-10 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-[#004AAD] mb-4">
                    Welcome to ZotMarket!
                </h1>
                <p className="mb-5 text-black">
                    This is the unofficial UCI marketplace for students to sell,
                    trade or give away their old stuff <br />
                    <br />
                    Sign into google above to continue
                </p>
            </div>
        </div>
    )
}
