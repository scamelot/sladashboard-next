import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link";

export default function Nav() {

    const {user, error, isLoading} = useUser()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    console.log(user)
    return (
        <div>
        {user ?
        <div>
            <Link className={btnStyle} href="/api/auth/logout">Logout</Link>
        </div>
        :
        <div>
            <Link className={btnStyle} href="/api/auth/login">Login</Link>
        </div>
        }
        </div>
    )
}

const btnStyle = 'px-2 flex justify-end mx-5 my-1 rounded-lg bg-indigo-500'