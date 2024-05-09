import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import { getUserImages } from "~/server/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
	// get images from server/queries.ts
	const images = await getUserImages();

	return (
		<>
			{images.length < 1 ? (
				<div className="p-4 h-[calc(100vh-200px)] flex">
					<h1 className="text-4xl font-bold text-gray-800 m-auto">
						You have no images yet!
					</h1>
				</div>
			) : (
				<div className="p-4">
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
						{images.map((img, index) => (
							<div key={`${img.id}-${index}`} className="">
								<Link href={`/img/${img.id}`}>
									<Image
										className="rounded-lg"
										src={img.url}
										width={480}
										height={480}
										style={{ objectFit: "contain" }}
										alt="A picture of a cabin"
									/>
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</>
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
