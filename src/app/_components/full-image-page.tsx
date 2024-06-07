import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {
	photoId: string
}) {
	const idAsNumber = Number(props.photoId);
	if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo ID: " + idAsNumber);
	const image = await getImage(idAsNumber);
	return (
		<div className="flex w-[600px] min-w-0 bg-black/75">
			<div className="flex-shrink flex justify-center items-center">
				<img src={image.url} className="flex-shrink" alt="" />
			</div>
			<div className="p-4 w-96 flex flex-col border-l">
				<p>{image.id}</p>
			</div>
		</div>
	);
}

// Next img optimization is a bit unhelpful here because we don't know the image specs of user uploaded images
