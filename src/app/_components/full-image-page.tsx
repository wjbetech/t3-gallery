import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export default async function FullPageImageView(props: {
	photoId: string;
}) {
	const idAsNumber = Number(props.photoId);
	if (Number.isNaN(idAsNumber))
		throw new Error("Invalid photo ID: " + idAsNumber);
	const image = await getImage(idAsNumber);
	const uploaderInfo = await clerkClient.users.getUser(image.userId);
	return (
		<div className="flex w-[600px] min-w-0 rounded-md border-gray-300  border-[1px] shadow-2xl shadow-gray-300 text-center">
			<div className="flex-shrink flex justify-center items-center">
				<img src={image.url} className="flex-shrink rounded-md" alt="" />
			</div>
			<div
				className="p-4 w-96 flex flex-col
			 justify-between border-l"
			>
				<h1 className="font-bold">{image.title}</h1>
				<div className="flex flex-col">
					<p>Photo #{image.id}</p>
					<span>-</span>
					<span className="text-xs">Uploaded By {uploaderInfo.firstName}</span>
					<span className="text-xs">
						{new Date(image.createdAt).toLocaleDateString()}
					</span>
				</div>
				<form
					action={async () => {
						"use server"; // expose function as POST endpoint wherever component is mounted
						await deleteImage(idAsNumber);
					}}
				>
					<Button type="submit" variant="destructive" className="w-full">
						Delete
					</Button>
				</form>
			</div>
		</div>
	);
}

// Next img optimization is a bit unhelpful here because we don't know the image specs of user uploaded images
