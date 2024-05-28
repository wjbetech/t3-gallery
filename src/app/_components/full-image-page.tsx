import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {
	id: number;
}) {
	const image = await getImage(props.id);
	return (
		<div className="flex w-[600px] min-w-0 bg-black/75">
			<div className="flex-shrink flex justify-center items-center">
				<img src={image.url} className="flex-shrink" alt="" />
			</div>
			<div className="p-4 w-96 flex flex-col">
				<p>{image.id}</p>
			</div>
		</div>
	);
}

// Next img optimization is a bit unhelpful here because we don't know the image specs of user uploaded images
