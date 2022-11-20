/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import HeroTwo from "../components/HeroTwo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import CTATwo from "../components/CTATwo";
import FeaturesBanner from "../components/FeaturesBanner";
import JumboGrid from "../components/jumboGrid";
import CardGrid from "../components/CardGrid";
import Stats from "../components/stats";

const homePageHero = {
	title: "It’s All About Problem-Solving",
	subtitle:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	backgroundImage: "/img/pexels-tiger-lily-4487361-min.jpg",
};

const featuresBanner = {
	iconOne: "/img/Icons/analysis.png",
	iconTwo: "/img/Icons/graphic-design.png",
	iconThree: "/img/Icons/site-map.png",
	textOne: "Multi-Channel Inventory Management",
	textTwo: "Vendor Management organizes all your vendor information",
	textThree: "Combine multiple products together and track the inventory",
};

const howItWorks = {
	title: "Our Services made simple",
	subtitle: "Connect your Inventory Without The Chaos",
	titleOne: "Be Always In Control.",
	titleTwo: "Keep updated all the time",
	titleThree: "Save Time And Money.",
	subtitleOne: "Create and Manage Inventory",
	subtitleTwo: "Track Related Products",
	subtitleThree: "Inventory Optimization",
	imageOne: "/img/pexels-kampus-production-8475203-min.jpg",
	imageTwo: "/img/pexels-rfstudio-3811082.jpg",
	imageThree: "/img/pexels-cottonbro-studio-7018653-min.jpg",
	textAreaOne:
		"Creating and managing inventory has never been easier. With powerful tools that integrate with popular POS and e-commerce. No more spending hours on spreadsheets to figure out what stock you have.",
	textAreaTwo:
		"Track inventory levels across a wide variety of products and calculate the costs of goods sold. No more logging into multiple seller panels and software to track sales. Stop worrying about running out of stock - plan your inventory with absolute clarity",
	textAreaThree:
		"BlueInventory's inventory tracking software helps you find what is selling and what is not, saving you time and money by ensuring that your inventory is not only accurate, but has been prioritized.",
};

export default function FeaturesPage() {
	return (
		<>
			<Head>
				<title>Features | Inventory Management Software</title>
				<meta name="description" content="Generated by create next app" />
				{/* <!-- Website Icon --> */}
				<link rel="icon" href="/img/Logos/BlueInventory favicon Two.png" />
			</Head>

			<main className={styles.main}>
				{/* Hero Section */}
				<HeroTwo data={homePageHero} />

				{/* Stats */}
				<Stats />

				{/* Feature Banner Section */}
				<FeaturesBanner data={featuresBanner} />

				{/*  */}
				<CardGrid />

				{/* How It Works */}
				<JumboGrid />
				{/* <HowItWorks title={howItWorks} data={howItWorks} /> */}

				{/* CTA Two */}
				<CTATwo />
			</main>
		</>
	);
}

// Removes Global Navbar & Adds Custom Header and Footer Page layout Function
FeaturesPage.getLayout = function PageLayout(page) {
	return (
		<>
			{/* <!--===== NAVBAR =====--> */}
			<Navbar />

			{/* <!--===== PAGE CONTENT =====--> */}
			{page}

			{/* <!--===== FOOTER =====--> */}
			<Footer />
		</>
	);
};
