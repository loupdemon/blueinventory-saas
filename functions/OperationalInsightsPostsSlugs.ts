// Import
import {client} from "../config/apollo";
import {DocumentNode, gql} from "@apollo/client";

type SlugResponse = {
	slug: string;
};

interface ISlug extends Array<SlugResponse> {}

// Operational Insights Slugs
export const fetchOperationalInsightsPostsSlugs = async (): Promise<ISlug> => {
	try {
		const content: DocumentNode = gql`
			{
				slugs: posts(where: {status: PUBLISH}) {
					nodes {
						slug
					}
				}
			}
		`;

		const response: any = await client.query({
			query: content,
		});

		return response?.data?.slugs?.nodes;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch the operational insight slugs"
		);
	}
};

// Operational Insights Posts Content
export const fetchOperationalInsightsPostsContent = async (slug: string) => {
	try {
		const getSingleOperationalInsightContent: DocumentNode = gql`
			{
				mainContent: post(id: "${slug}", idType: SLUG) {
                    title
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
					singleOperationalInsightPost {
						heroSection {
      					  title
      					  paragraph
      					  backgroundVideoUrl
      					  backgroundImageOrVideo
      					  backgroundImage {
      					    altText
          					sourceUrl
          					mediaDetails {
          					  height
          					  width
          					}
      					  }
      					}
						titleParagraph {
							title
							paragraph
						}
						contactBanner {
							title
							paragraph
							buttonLink {
								url
								title
								target
							}
							backgroundImage {
								sourceUrl
							}
						}
					}
				}
			}
		`;

		const response: any = await client.query({
			query: getSingleOperationalInsightContent,
		});

		return {
			seo: response?.data?.mainContent?.seo,
			pageTitle: response?.data?.mainContent?.title,
			content: response.data?.mainContent?.singleOperationalInsightPost,
		};
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch the operational insight slugs content"
		);
	}
};

// All Operational Insights
export async function getAllOperationalInsightsContent() {
	try {
		const content: DocumentNode = gql`
			{
				mainContent: posts(where: {status: PUBLISH}, last: 10) {
					edges {
						node {
							id
							uri
							date
							title(format: RENDERED)
							featuredImage {
								node {
									altText
									sourceUrl
									mediaDetails {
										height
										width
									}
								}
							}
							singleOperationalInsightPost {
								titleParagraph {
									paragraph
								}
							}
						}
					}
				}
			}
		`;

		const response: any = await client.query({
			query: content,
		});

		return response?.data?.mainContent?.edges;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch all the operational insight posts"
		);
	}
}