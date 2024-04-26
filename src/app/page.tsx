import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
	const images = await db.query.images.findMany({
		orderBy: (model, { desc }) => desc(model.createdAt),
	});
	return (
		<div className="p-4">
			<div className="grid grid-cols-3 gap-4 pt-2">
				{[...images, ...images, ...images].map((img, index) => (
					<div key={`${img.id}-${index}`} className="">
						<img className="rounded-lg" src={img.url} alt="a cabin" />
					</div>
				))}
			</div>
		</div>
	);
}

export default async function HomePage() {
	const images = await db.query.images.findMany({
		orderBy: (model, { desc }) => desc(model.createdAt),
	});
	console.log(images);
	return (
		<main className="h-full">
			<SignedOut>
				<div className="w-full text-center mt-10">
					<SignInButton />
				</div>
			</SignedOut>
			<SignedIn>
				<Images />
			</SignedIn>
		</main>
	);
}
