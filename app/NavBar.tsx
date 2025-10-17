'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath)
    const links = [
        {label:'Dashboard', href:'/'},
        {label:'Issues', href:'/issues'},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14'>
        <Link href="/"><FaBug /></Link>
        <ul className='flex space-x-6 border-b mb-5 px-5 h-14'>
            {/* {links.map(link=><li key={link.href}><Link key={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors' href={link.href}>{link.label}</Link></li>)} */}

            {links.map(link=><Link key={link.href} className={classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors':true
            })} href={link.href}>{link.label}</Link>)}
            {/* {links.map(link=><Link key={link.href} className={`${link.href === currentPath ? 'text-zinc-900':'text-zinc-500'} hover:text-zinc-800 transition-colors`} href={link.href}>{link.label}</Link>)} */}
        </ul>
    </nav>
  )
}

export default NavBar