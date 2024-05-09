import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";

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
	if (!user.userId) throw new Error("Unauthorised user!");

	const image = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!image) throw new Error("Image not found");
	if (image.userId !== user.userId) throw new Error("Unauthorised!");

	return image;
}
