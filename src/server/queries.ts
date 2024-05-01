import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

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
