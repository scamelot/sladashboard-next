import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link";
import Head from "next/head";

export default function Nav() {

    const {user, error, isLoading} = useUser()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    console.log(user)
    return (
        <div>
            <Head>
                <title>SLA Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
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