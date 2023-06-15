// Imports
import {FC} from "react";
import Head from "next/head";
import {ILayoutTwo} from "@/components/types";

// Components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Layout: FC<ILayoutTwo> = ({children, pageTitle}) => {
	return (
		<>
			<Head>
				<title>{`${pageTitle} | Inventory Management Software`}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/img/Logos/BlueInventory favicon Two.png" />
			</Head>

			<Navbar />

			<section className="pt-16">{children}</section>

			<Footer />
		</>
	);
};

export default Layout;
