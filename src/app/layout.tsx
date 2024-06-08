import "~/styles/globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { CSPostHogProvider } from './providers'

// components
import Navbar from "./_components/Navbar";

// font
import { Inter } from "next/font/google";
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

// biome-ignore lint/style/useImportType: <explanation>
// toaster
import { Toaster } from "~/components/ui/sonner";

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
				<CSPostHogProvider>
					<NextSSRPlugin
						/**
						 * The `extractRouterConfig` will extract **only** the route configs
						 * from the router to prevent additional information from being
						 * leaked to the client. The data passed to the client is the same
						 * as if you were to fetch `/api/uploadthing` directly.
						 */
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>
					<body className={`font-sans ${inter.variable} dark`}>
						<div className="h-screen grid grid-rows-[auto,1fr]">
							<Navbar />
							<main className="overflow-y-scroll">
								{children}
							</main>
						</div>
						{modal}
						<div id="modal-root" />		
						<Toaster />	
					</body>
				</ CSPostHogProvider>
			</html>
		</ClerkProvider>
	);
}
