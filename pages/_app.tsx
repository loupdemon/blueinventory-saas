// Imports
import type {AppProps} from "next/app";
import {client} from "@/config/apollo";
import {useState, useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {ApolloProvider} from "@apollo/client/react";

// PostHog Cookies Policy
import postHog from "posthog-js";
import {PostHogProvider} from "posthog-js/react";

// Global Context Provider
import {GlobalContext} from "@/context/Global";
import {IErrorPageContent, IGlobalContext} from "@/types/context/public";

// Firebase
import {Auth, getAuth} from "firebase/auth";
import initializeFirebase from "@/firebase/firebase";

// Stripe Functions
import {getAllStripePaymentPlans} from "@/functions/Backend/stripe/GetStripePaymentPlans";

// Queries Functions
import {
	getMainMenuLinks,
	getNavbarMenuLinks,
	getFooterMenuLinks,
	getIndustriesMenuLinks,
} from "@/functions/Frontend/graphql/Queries/GetAllMenuLinks";
import {getThemesOptionsContent} from "@/functions/Frontend/graphql/Queries/GetAllThemesOptions";
import {getContentSliderBlogPostsPostsContent} from "@/functions/Frontend/graphql/Queries/GetAllContentSliderPosts";
import {getAllOperationalInsightsContent} from "@/functions/Frontend/graphql/Queries/GetAllOperationalInsightsPostsSlugs";

// Styling
import "../styles/globals.scss";

// Components
import ErrorPage from "@/components/Frontend/Elements/ErrorPage";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
	postHog.init(`${process.env.POSTHOG_KEY}`, {
		api_host: `${process.env.POSTHOG_HOST}` || "https://app.posthog.com",
		// Disable in development
		loaded: (postHog) => {
			if (process.env.NODE_ENV === "development") postHog.opt_out_capturing();
		},
	});
}

/* Public Pages Authentication: Pages that don't require 
users to sign-in to view them */
const publicPages: Array<string> = [
	"/",
	"/404",
	"/login",
	"/[slug]",
	"/sign-in",
	"/payment",
	"/success",
	"/sign-up",
	"/checkout",
	"/wp-admin/",
	"/wp-login",
	"/api/sitemap.xml",
	"/industries/[slug]",
	"/page/preview/pageId=/[id]",
	"/operational-insights/[slug]",
	"/industries/preview/pageId=/[id]",
	"/operational-insights/preview/postId=/[id]",
];

const protectedPages: Array<string> = [
	"/dashboard",
	"/dashboard/items",
	"/dashboard/settings",
	"/dashboard/documents",
	"/dashboard/items/add",
	"/dashboard/items/[id]",
	"/dashboard/categories",
];

export default function App({
	Component,
	pageProps,
	globalProps,
}: AppProps | any) {
	const router: NextRouter = useRouter();
	// FIREBASE //
	// Initializing Firebase
	initializeFirebase();

	// Retrieving Firebase User Details
	const auth: Auth = getAuth();
	const [signedInUser, setSignedInUser] = useState(false);

	/* Check if user is SIGNED IN if 
	True Displays Signed In Navbar */
	useEffect(() => {
		auth?.onAuthStateChanged((currentUser: any) => {
			currentUser ? setSignedInUser(true) : setSignedInUser(false);
		});

		return () => {
			signedInUser;
		};
	}, [signedInUser, auth]);

	// PROTECTED PAGES //
	// Public Pages: Get the pathname
	const {pathname} = useRouter();

	// Public Pages: Check if the current route matches a public page
	const isPublicPage: boolean = publicPages.includes(pathname);
	const isProtectedPage: boolean = protectedPages.includes(pathname);

	// NOT SIGNED-IN ERROR PAGE //
	// Error Page Content
	const errorPageContent: IErrorPageContent = {
		title: "Something went wrong!",
		buttonLink: {
			url: "/",
			title: "Homepage",
			target: "",
		},
		buttonLinkTwo: {
			url: "/sign-in",
			title: "Sign In",
			target: "",
		},
		paragraph:
			"The page you are looking for is not accessible! Please login in or go back to homepage.",
		backgroundImage:
			"/svg/backgroundSVG/stacked-waves-haikei-blue-darkblue.svg",
	};

	// COOKIES POLICY //
	// PostHog Cookies Policy
	useEffect(() => {
		// Track page views
		const handleRouteChange = () => postHog?.capture("$pageview");
		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	});

	// PAGE LOADING ANIMATION //
	// Page Animation Loader
	function Loading() {
		const [loading, setLoading]: any = useState(false);

		useEffect(() => {
			const handleStart = (url: any) =>
				url !== router.asPath && setLoading(true);
			const handleComplete = (url: any) =>
				url === router.asPath &&
				setTimeout(() => {
					setLoading(false);
				}, 5000);

			router.events.on("routeChangeStart", handleStart);
			router.events.on("routeChangeComplete", handleComplete);
			router.events.on("routeChangeError", handleComplete);

			return () => {
				router.events.off("routeChangeStart", handleStart);
				router.events.off("routeChangeComplete", handleComplete);
				router.events.off("routeChangeError", handleComplete);
			};
		});

		return (
			loading && (
				<div className="spinner-wrapper">
					{/* LEGO SPINNER */}
					<div className="loader">
						<div className="box box0">
							<div></div>
						</div>
						<div className="box box1">
							<div></div>
						</div>
						<div className="box box2">
							<div></div>
						</div>
						<div className="box box3">
							<div></div>
						</div>
						<div className="box box4">
							<div></div>
						</div>
						<div className="box box5">
							<div></div>
						</div>
						<div className="box box6">
							<div></div>
						</div>
						<div className="box box7">
							<div></div>
						</div>
						<div className="ground">
							<div></div>
						</div>
					</div>
				</div>
			)
		);
	}

	return (
		<ApolloProvider client={client}>
			<PostHogProvider client={postHog}>
				{isProtectedPage && signedInUser ? (
					<>
						<Loading />
						<Component {...pageProps} />
					</>
				) : isPublicPage ? (
					<GlobalContext.Provider
						value={{
							stripePlans: globalProps?.stripePlans,
							mainMenuLinks: globalProps?.mainMenuLinks,
							navbarMenuLinks: globalProps?.navbarMenuLinks,
							footerMenuLinks: globalProps?.footerMenuLinks,
							industriesMenuLinks: globalProps?.industriesMenuLinks,
							themesOptionsContent: globalProps?.themesOptionsContent,
							operationalInsights: globalProps?.operationalInsights,
							contentSliderPostsContent: globalProps?.contentSliderPostsContent,
						}}
					>
						<>
							<Loading />
							<Component {...pageProps} />
						</>
					</GlobalContext.Provider>
				) : (
					<>
						<Loading />
						<ErrorPage
							title={errorPageContent?.title}
							paragraph={errorPageContent?.paragraph}
							buttonLink={errorPageContent?.buttonLink}
							buttonLinkTwo={errorPageContent?.buttonLinkTwo}
							backgroundImage={errorPageContent?.backgroundImage}
						/>
					</>
				)}
			</PostHogProvider>
		</ApolloProvider>
	);
}

App.getInitialProps = async ({Component, ctx}: any) => {
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	// PUBLIC PAGES //
	/* Fetch all global content
	remaining content simultaneously */
	const [
		stripePlans,
		mainMenuLinks,
		navbarMenuLinks,
		footerMenuLinks,
		industriesMenuLinks,
		themesOptionsContent,
		operationalInsights,
		contentSliderPostsContent,
	] = await Promise.all([
		getAllStripePaymentPlans(),
		getMainMenuLinks(),
		getNavbarMenuLinks(),
		getFooterMenuLinks(),
		getIndustriesMenuLinks(),
		getThemesOptionsContent(),
		getAllOperationalInsightsContent(),
		getContentSliderBlogPostsPostsContent(),
	]);

	const globalProps: IGlobalContext = {
		stripePlans: stripePlans,
		mainMenuLinks: mainMenuLinks,
		navbarMenuLinks: navbarMenuLinks,
		footerMenuLinks: footerMenuLinks,
		industriesMenuLinks: industriesMenuLinks,
		themesOptionsContent: themesOptionsContent,
		operationalInsights: operationalInsights,
		contentSliderPostsContent: contentSliderPostsContent,
	};

	return {
		pageProps,
		globalProps,
	};
};
