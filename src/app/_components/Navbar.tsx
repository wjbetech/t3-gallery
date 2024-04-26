import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";
import React from "react";

export default function Navbar() {
	return (
		<nav className="flex w-full items-center justify-between p-4">
			<div>
				<h1 className="text-xl font-semibold">T3 Gallery</h1>
			</div>
			<div>
				<input type="text" />
			</div>
			<div className="">
				<ul className="flex gap-4">
					<li>
						<a href="/">Home</a>
					</li>
					<div>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<SignOutButton />
						</SignedIn>
					</div>
				</ul>
			</div>
		</nav>
	);
}