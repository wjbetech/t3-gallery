import Link from "next/link";

const mockMediaURL = [
	"https://utfs.io/f/ffa61048-2c84-4ccd-83fc-17b2b15f2ac8-q43dx2.jpg",
	"https://utfs.io/f/706da11b-a125-4789-96ef-1819bdc81f29-br2hpv.jpg",
	"https://utfs.io/f/3f95976c-110c-4031-989d-f4b9abf46185-jazxw6.jpg",
	"https://utfs.io/f/2c0c8baa-79bb-457d-8fcd-01e8882eab51-oj0bvn.jpg",
];

const mockImgs = mockMediaURL.map((url, index) => ({
	id: index + 1,
	url,
}));

export default function HomePage() {
	return (
		<main className="min-h-screen p-4">
			<h1>cabin gallery</h1>
			<div className="grid grid-cols-3 gap-4 pt-2">
				{[...mockImgs, ...mockImgs, ...mockImgs].map((i) => (
					<div key={i.id} className="">
						<img className="rounded-lg" src={i.url} alt="a cabin" />
					</div>
				))}
			</div>
		</main>
	);
}
