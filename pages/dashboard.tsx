// Imports
import {motion} from "framer-motion";
import type {NextPage, GetServerSideProps} from "next";
import {getThemesOptionsContent} from "../functions/themesOptions";

// Styling
import styles from "@/styles/pages/Dashboard.module.scss";

// Components

interface IDashboard {
	themesOptionsContent: {
		email: string;
		emailTwo: string;
		phoneNumber: string;
		phoneNumberTwo: string;
		twitterLink: string;
		facebookLink: string;
		linkedinLink: string;
		copyRightText: string;
		errorPageContent: {
			title: string;
			paragraph: string;
			buttonLink: {
				url: string;
				title: string;
				target: string;
			};
			buttonLinkTwo: {
				url: string;
				title: string;
				target: string;
			};
			backgroundImage: {
				sourceUrl: string;
			};
		};
	};
}

const dashboard: NextPage<IDashboard> = ({themesOptionsContent}) => {
	return (
		<motion.div
			exit={{
				opacity: 0,
			}}
			initial="initial"
			animate="animate"
		>
			<section className={styles.dashboardContent}>Hello</section>
		</motion.div>
	);
};

export default dashboard;

export const getServerSideProps: GetServerSideProps = async () => {
	const themesOptionsContent: object = await getThemesOptionsContent();

	const props = {
		themesOptionsContent,
	};

	return {
		props,
	};
};
