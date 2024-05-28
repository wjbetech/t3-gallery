import { Modal } from "./modal";
import FullPageImageView from "~/app/_components/full-image-page";

export default async function PhotoModal({
	params: { id: photoId },
}: {
	params: { id: string };
}) {
	const idAsNumber = Number(photoId);
	if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo Id (NaN)");

	return (
		<Modal>
			<FullPageImageView id={idAsNumber} />
		</Modal>
	);
}
