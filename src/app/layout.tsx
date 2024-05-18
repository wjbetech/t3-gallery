import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// components
import Navbar from "./_components/Navbar";

// font
import { Inter } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "T3-gallery | @wjbetech",
	description: "A T3 generated gallery app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<NextSSRPlugin
					/**
					 * The `extractRouterConfig` will extract **only** the route configs
					 * from the router to prevent additional information from being
					 * leaked to the client. The data passed to the client is the same
					 * as if you were to fetch `/api/uploadthing` directly.
					 */
					routerConfig={extractRouterConfig(ourFileRouter)}
				/>
				<body className={`font-sans ${inter.variable} h-[calc(100vh-100px)]`}>
					<Navbar />
					<main>{children}</main>
					{modal}
					<div id="modal-root" />
				</body>
			</html>
		</ClerkProvider>
	);
}
