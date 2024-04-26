import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// components
import Navbar from "./_components/Navbar";

// font
import { Inter } from "next/font/google";
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
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`font-sans ${inter.variable}`}>
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
