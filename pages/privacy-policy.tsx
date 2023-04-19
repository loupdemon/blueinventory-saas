// Import
import {gql} from "@apollo/client";
import {motion} from "framer-motion";
import {client} from "../config/apollo";
import {getThemesOptionsContent} from "../functions/themesOptions";
import {
	getMainMenuLinks,
	getNavbarMenuLinks,
	getFooterMenuLinks,
	getIndustriesMenuLinks,
} from "../functions/MenuLinks";

// Components
import Layout from "../components/Layout/Layout";
import TitleParagraph from "../components/TitleParagraph";

const privacyPolicy = ({
	seo,
	content,
	pageTitle,
	footerMenuLinks,
	navbarMenuLinks,
	industriesMenuLinks,
	themesOptionsContent,
}: any) => {
	return (
		<motion.div
			exit={{
				opacity: 0,
			}}
			initial="initial"
			animate="animate"
		>
			<Layout
				seo={seo}
				pageTitle={pageTitle}
				themesOptionsContent={themesOptionsContent}
				footerMenuLinks={footerMenuLinks?.footerMenuLinks}
				navbarMenuLinks={navbarMenuLinks?.navbarMenuLinks}
				industriesMenuLinks={industriesMenuLinks?.industriesMenuLinks}
			>
				<TitleParagraph
					title={content?.titleParagraph?.title}
					paragraph={content?.titleParagraph?.paragraph}
				/>
			</Layout>
		</motion.div>
	);
};

export default privacyPolicy;

export async function getStaticProps() {
	const gePrivacyPolicyPageContent: any = gql`
		{
			title: pages(where: {id: 547}) {
				edges {
					node {
						title
					}
				}
			}
			mainContent: pages(where: {id: 547, status: PUBLISH}) {
				edges {
					node {
						seo {
							canonical
							cornerstone
							focuskw
							fullHead
							metaDesc
							metaKeywords
							metaRobotsNofollow
							metaRobotsNoindex
							opengraphAuthor
							opengraphDescription
							opengraphImage {
								mediaItemUrl
							}
							opengraphModifiedTime
							opengraphPublishedTime
							opengraphPublisher
							opengraphSiteName
							opengraphTitle
							opengraphType
							opengraphUrl
							readingTime
							title
							twitterDescription
							twitterTitle
							twitterImage {
								mediaItemUrl
							}
						}
						privacyPolicyPage {
							titleParagraph {
								title
								paragraph
							}
						}
					}
				}
			}
		}
	`;

	const response: any = await client.query({
		query: gePrivacyPolicyPageContent,
	});

	const navbarMenuLinks: object = await getNavbarMenuLinks();
	const footerMenuLinks: object = await getFooterMenuLinks();
	const industriesMenuLinks: object = await getIndustriesMenuLinks();
	const themesOptionsContent: object = await getThemesOptionsContent();

	return {
		props: {
			navbarMenuLinks,
			footerMenuLinks,
			industriesMenuLinks,
			themesOptionsContent,
			seo: response?.data?.mainContent?.edges[0]?.node?.seo,
			pageTitle: response?.data?.title?.edges[0]?.node?.title,
			content: response?.data?.mainContent?.edges[0]?.node?.privacyPolicyPage,
		},
		revalidate: 60,
	};
}
