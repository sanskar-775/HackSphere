import Link from 'next/link'


function Navlinks(){
    return(
        <>
            {/* <li className="mr-2"><Link href="/features">Features</Link></li> */}
            <li className="mr-2"><Link href="/Host">Host</Link></li>
            {/* <li className="mr-2"><Link href="/blogs">Blogs</Link></li> */}
            <li className="mr-2"><Link href="/Aboutus">About Us</Link></li>
            <li className="mr-2"><Link href="/events">Events</Link></li>
        </>
    )
}

export default Navlinks