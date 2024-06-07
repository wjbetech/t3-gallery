import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {
	photoId: string
}) {
	const idAsNumber = Number(props.photoId);
	if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo ID: " + idAsNumber);
	const image = await getImage(idAsNumber);
	const uploaderInfo = await clerkClient.users.getUser(image.userId)
	return (
		<div className="flex w-[600px] min-w-0 bg-black/65 rounded-md border-gray-300  border-[1px] shadow-2xl shadow-gray-300">
			<div className="flex-shrink flex justify-center items-center">
				<img src={image.url} className="flex-shrink rounded-md" alt="" />
			</div>
			<div className="p-4 w-96 flex flex-col justify-between border-l">
				<h1 className="font-bold">{image.title}</h1>
				<p>Photo #{image.id}</p>
				<div className="flex flex-col gap-2 text-xs">
					<span>Uploaded By {uploaderInfo.firstName}</span>
					<span>{new Date(image.createdAt).toLocaleDateString()}</span>
				</div>
			</div>
		</div>
	);
}

// Next img optimization is a bit unhelpful here because we don't know the image specs of user uploaded images
