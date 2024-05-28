import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {
	id: number;
}) {
	const image = await getImage(props.id);
	return (
		<div className="flex w-full bg-green-500">
			<img src={image.url} className="w-96" alt="" />
			<div>
				<p>{image.userId}</p>
				<p>{image.id}</p>
				<p>{image.url}</p>x
			</div>
		</div>
	);
}

// Next img optimization is a bit unhelpful here because we don't know the image specs of user uploaded images
