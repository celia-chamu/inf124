import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function Home() {
  return (
      <div className="flex flex-col items-center">
        Welcome to ZotMarket. Click Login above to continue.
        <Link href="/market">
          <Button className="p-2 px-5 rounded-2xl">Login as Guest</Button> {/* Temporary way to access rest of the website. */}
        </Link>
      </div>
  );
}