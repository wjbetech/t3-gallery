import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const images = await db.query.images.findMany({
		orderBy: (model, { desc }) => desc(model.createdAt),
	});
	console.log(images);
	return (
		<main className="min-h-screen p-4">
			<h1>cabin gallery</h1>
			<div className="grid grid-cols-3 gap-4 pt-2">
				{[...images, ...images, ...images].map((img, index) => (
					<div key={`${img.id}-${index}`} className="">
						<img className="rounded-lg" src={img.url} alt="a cabin" />
					</div>
				))}
			</div>
		</main>
	);
}
