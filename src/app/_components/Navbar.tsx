import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
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
			<div className="">
				<ul className="">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<div className="gap-2 flex flex-row">
						<SignedIn>
							<UploadButton
								endpoint="imageUploader"
								className="scale-90 flex flex-row gap-4"
							/>
							<UserButton />
						</SignedIn>
					</div>
				</ul>
			</div>
		</nav>
	);
}
