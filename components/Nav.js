import { useUser } from "@auth0/nextjs-auth0/client"

export default function Nav() {

    const {user, error, isLoading} = useUser()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>
        {user ?
        <div>
            <a className={btnStyle} href="/api/auth/logout">Logout</a>
        </div>
        :
        <div>
            <a className={btnStyle} href="/api/auth/login">Login</a>
        </div>
        }
        </div>
    )
}

const btnStyle = 'px-2 flex justify-end mx-5 my-1 rounded-lg bg-indigo-500'