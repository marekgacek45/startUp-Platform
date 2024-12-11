import { auth, signOut, signIn } from '@/auth'
import { LogOut, PencilIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async () => {
	const session = await auth()

	console.log(session);

	return (
		<header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
			<nav className='flex justify-between items-center'>
				<Link href='/'>
					<Image src='/logo.svg' alt='logo' width={75} height={36} />
				</Link>

				<div className='flex items-center gap-5 text-black'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span className='max-sm:hidden'>Create</span>
								<PencilIcon className='size-6 sm:hidden text-red-400'/>
							</Link>

							<button
								onClick={async () => {
									'use server'
									await signOut({redirectTo: '/'})
								}}>
								<span className='max-sm:hidden'>Sign out</span>
								<LogOut className='size-6 sm:hidden text-red-400'/>
							</button>

							<Link href={`/user/${session?.id}`}>
								<Avatar className='size-10'>
									<AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}  />
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<button
							onClick={async () => {
								'use server'
								await signIn('github')
							}}>
							<span>Sign in</span>
						</button>
						// <form
						// 	action={async () => {
						//         'use server'
						// 		await signIn('github')
						// 	}}>
						// 	<button type='submit'>
						// 	<span>Sign in</span>
						// </button>
						// </form>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Navbar
