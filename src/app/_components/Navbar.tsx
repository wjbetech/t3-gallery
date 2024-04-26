import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import React from "react";

export default function Navbar() {
	return (
		<nav className="flex w-full items-center justify-between p-4 align-baseline">
			<div>
				<h1 className="text-xl font-semibold">T3 Gallery</h1>
			</div>
			<div>
				<input type="text" />
			</div>
			<div>
				<ul className="flex gap-4">
					<div className="flex">
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<div className="gap-2">
							<SignedIn>
								<UserButton showName />
							</SignedIn>
						</div>
					</div>
				</ul>
			</div>
		</nav>
	);
}
