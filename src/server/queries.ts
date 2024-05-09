import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

// auth call
const user = auth();

export async function getUserImages() {
	if (!user.userId) {
		throw new Error("Unauthorised user!");
	}

	const images = await db.query.images.findMany({
		where: (model, { eq }) => eq(model.userId, user.userId),
		orderBy: (model, { desc }) => desc(model.createdAt),
	});
	return images;
}

export async function getImage(id: number) {
	const image = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!image) throw new Error("Image not found");
	if (!user.userId) throw new Error("Unauthorised user!");
	if (image.userId !== user.userId) throw new Error("Unauthorised!");
}
