// Imports
import {IStripePlans} from "@/types/stripe";

export type ISeo = {
	canonical: string;
	cornerstone: Boolean;
	focuskw: string;
	fullHead: string;
	metaDesc: string;
	metaKeywords: string;
	metaRobotsNofollow: string;
	metaRobotsNoindex: string;
	opengraphAuthor: string;
	opengraphDescription: string;
	opengraphImage: {
		mediaItemUrl: string;
	};
	opengraphModifiedTime: string;
	opengraphPublishedTime: string;
	opengraphPublisher: string;
	opengraphSiteName: string;
	opengraphTitle: string;
	opengraphType: string;
	opengraphUrl: string;
	readingTime: number;
	title: string;
	twitterDescription: string;
	twitterTitle: string;
	twitterImage: {
		mediaItemUrl: string;
	};
};

export type IContent = [
	{
		content: any;
	}
];

export type IPostTypes = {
	pages: string;
	posts: string;
	industry: string;
	previewPage: string;
	previewPost: string;
	previewIndustry: string;
};

export type IFooterMenuLinks = {
	footerMenuLinks: [
		{
			node: {
				id: string;
				url: string;
				label: string;
			};
		}
	];
};

export type INavbarMenuLinks = {
	navbarMenuLinks: [
		{
			node: {
				id: string;
				url: string;
				label: string;
			};
		}
	];
};

export type IErrorPageContent = {
	title: string;
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
	paragraph: string;
	backgroundImage: string;
};

export interface IContentContext {
	seo: ISeo;
	content: IContent;
	stripePlans: IStripePlans;
	navbarMenuLinks: INavbarMenuLinks;
	footerMenuLinks: IFooterMenuLinks;
	industriesMenuLinks: IIndustriesMenuLinks;
	operationalInsights: IOperationalInsights;
	themesOptionsContent: IThemesOptionsContent;
	postTypeFlexibleContent: IpostTypeFlexibleContent;
	contentSliderPostsContent: IContentSliderPostsContent;
}

export type IIndustriesMenuLinks = {
	industriesMenuLinks: [
		{
			node: {
				id: string;
				url: string;
				label: string;
			};
		}
	];
};

export type IOperationalInsights = [
	{
		node: {
			id: string;
			uri: string;
			title: string;
			featuredImage: {
				node: {
					altText: string;
					sourceUrl: string;
					mediaDetails: {
						width: number;
						height: number;
					};
				};
			};
			template: {
				flexibleContent: {
					flexibleContent: [
						{
							fieldGroupName: string;
							paragraph: string;
							title: string;
						}
					];
				};
			};
		};
	}
];

export type IThemesOptionsContent = {
	email: string;
	address: string;
	emailTwo: string;
	phoneNumber: string;
	phoneNumberTwo: string;
	twitterLink: string;
	facebookLink: string;
	linkedinLink: string;
	copyrightText: string;
};

export type IpostTypeFlexibleContent = {
	postTypeFlexibleContent: string;
};

export type IPostTypesFlexiblecontent = {
	pages: string;
	previewPage: string;
	previewPost: string;
	previewIndustry: string;
};

export type IContentSliderPostsContent = {
	content: [
		{
			uri: string;
			date: string;
			title: string;
			template: {
				flexibleContent: {
					flexibleContent: [
						{
							fieldGroupName: string;
							backgroundVideoUrl: string;
							backgroundImageOrVideo: string;
							backgroundImage: {
								altText: string;
								sourceUrl: string;
								mediaDetails: {
									height: number;
									width: number;
								};
							};
						},
						{
							fieldGroupName: string;
							paragraph: string;
							title: string;
						}
					];
				};
			};
		},
		{
			uri: string;
			date: string;
			title: string;
			template: {
				flexibleContent: {
					flexibleContent: [
						{
							fieldGroupName: string;
							backgroundVideoUrl: string;
							backgroundImageOrVideo: string;
							backgroundImage: {
								altText: string;
								sourceUrl: string;
								mediaDetails: {
									height: number;
									width: number;
								};
							};
						},
						{
							fieldGroupName: string;
							paragraph: string;
							title: string;
						}
					];
				};
			};
		},
		{
			uri: string;
			date: string;
			title: string;
			template: {
				flexibleContent: {
					flexibleContent: [
						{
							fieldGroupName: string;
							backgroundVideoUrl: string;
							backgroundImageOrVideo: string;
							backgroundImage: {
								altText: string;
								sourceUrl: string;
								mediaDetails: {
									height: number;
									width: number;
								};
							};
						},
						{
							fieldGroupName: string;
							paragraph: string;
							title: string;
						}
					];
				};
			};
		}
	];
};