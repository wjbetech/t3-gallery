import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// n.b. we cannot call auth here because the auth call only runs inside of client components

export async function getUserImages() {
	// auth call
	const user = auth();

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
	// auth call
	const user = auth();

	if (!user.userId) throw new Error("Unauthorised user!");

	const image = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!image) throw new Error("Image not found");
	if (image.userId !== user.userId) throw new Error("Unauthorised!");

	return image;
}

export async function deleteImage(id: number) {
	// authorise user
	const user = auth();

	if (!user.userId) throw new Error("Unauthorised user!");

	const imageToDelete = await db.query.images.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});

	if (!imageToDelete) throw new Error("Image not found!");

	if (imageToDelete.userId !== user.userId) throw new Error("Unauthorised!");

	await db
		.delete(images)
		.where(and(eq(images.id, id), eq(images.userId, user.userId)));

	redirect("/");
}
