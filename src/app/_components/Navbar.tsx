"use client";

import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
	// router for refresh on upload
	const router = useRouter();

	return (
		<nav className="flex w-full items-center justify-between p-4 align-baseline">
			<div>
				<h1 className="text-2xl font-bold">T3 Gallery</h1>
			</div>
			<div>
				<input type="text" />
			</div>
			<div className="">
				<ul className="">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<div className="gap-4 flex flex-row">
						<SignedIn>
							<UploadButton
								endpoint="imageUploader"
								onClientUploadComplete={() => {
									router.refresh();
									alert("Upload complete!");
								}}
								className="scale-[90%] flex flex-row gap-2"
							/>
							<UserButton />
						</SignedIn>
					</div>
				</ul>
			</div>
		</nav>
	);
}
