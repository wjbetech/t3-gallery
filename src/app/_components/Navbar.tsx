"use client";

import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import React from "react";
import { SimpleUploadButton } from "./UploadButton";

export default function Navbar() {
	return (
		<nav className="flex w-full items-center justify-between p-4 align-baseline">
			<div>
				<h1 className="text-2xl font-bold">T3 Gallery</h1>
			</div>
			<div className="">
				<ul className="">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<div className="gap-4 flex flex-row items-center">
						<SignedIn>
							<SimpleUploadButton
								endpoint="imageUploader"
								className="scale-[90%] flex flex-row gap-2">
							</SimpleUploadButton>
							<UserButton />
						</SignedIn>
					</div>
				</ul>
			</div>
		</nav>
	);
}
