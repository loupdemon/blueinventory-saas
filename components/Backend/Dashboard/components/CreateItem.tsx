// Imports
import {
	fadeIn,
	initial,
	stagger,
	fadeInUp,
	initialTwo,
} from "@/animations/animations";
import {FC} from "react";
import {motion} from "framer-motion";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {useFormik, Formik, Field, Form} from "formik";

// Firebase
import {INewCreatedItem} from "@/types/firebase";
import {useFirebaseContext} from "@/context/Firebase";
import {createUserItem} from "@/functions/Backend/firebase/createItem";

// Styling
import styles from "@/styles/components/ContactForm.module.scss";

// Components
import Paragraph from "@/components/Frontend/Elements/Paragraph";

const CreateItem: FC = () => {
	const router = useRouter();
	const firebaseContext = useFirebaseContext();

	const userDocID: string | null = firebaseContext?.userDocId;
	const userDisplayName: string | undefined =
		firebaseContext?.userData?.displayName;

	// Loading, Send & Error Message States
	const [loading, setLoading] = useState(false);
	const [messageSent, setMessageSent] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	// A custom validation function. This must return an object
	// which keys are symmetrical to our values/initialValues
	const validate: any = (values: any) => {
		const errors: any = {};
		if (!values?.itemName) {
			errors.itemName = "Required*";
		} else if (values?.itemName.length >= 50) {
			errors.itemName = "Must be 15 characters or less";
		}

		return errors;
	};

	/* Create Item Form Fields
	And Initial Values */
	const formik: any = useFormik({
		initialValues: {
			itemName: "",
			description: "",
			value: "",
			quantity: "",
			category: "",
		},
		validate,
		onSubmit: async (values: INewCreatedItem) => {
			try {
				await createUserItem(userDocID, userDisplayName, values);
			} catch (error) {
				setErrorMessage(true);
				throw new Error(
					"Error Message: Something went wrong with creating your item. Please try again."
				);
			}
		},
	});

	// Form Submission
	const onFormSubmit = (event: any) => {
		event.preventDefault();
		setErrorMessage(false);
		try {
			if (userDocID) {
				setLoading(true);
				/* Create Item */
				formik.handleSubmit();
				setLoading(false);
				setMessageSent(true);
				setTimeout(() => {
					router.reload();
				}, 3000);
			}
		} catch (error) {
			setErrorMessage(true);
			throw new Error(
				"Error Message: Something went wrong with creating your item. Please try again."
			);
		}
	};

	return (
		<>
			<div className={styles.createItem + " w-full px-4 py-20"}>
				<Formik
					onSubmit={formik?.onSubmit}
					initialValues={formik?.initialValues}
					onReset={formik?.initialValues}
				>
					<Form className="container mx-auto transition-all ease-in-out duration-[0.5s] md:max-w-10xl">
						{loading ? (
							<motion.div
								initial={initialTwo}
								whileInView={fadeIn}
								viewport={{once: true}}
								className="flex items-center justify-center my-4 mb-8 gap-x-2"
							>
								<h4 className="text-xl font-semibold text-center uppercase text-blue">
									Creating Item...
								</h4>
							</motion.div>
						) : messageSent ? (
							<motion.div
								initial={initialTwo}
								whileInView={fadeIn}
								viewport={{once: true}}
								className="flex items-center justify-center my-4 mb-8 gap-x-2"
							>
								<h4 className="text-xl font-semibold text-center uppercase text-goldPrime">
									Item Created!
								</h4>
							</motion.div>
						) : errorMessage ? (
							<motion.div
								initial={initialTwo}
								whileInView={fadeIn}
								viewport={{once: true}}
								className="flex items-center justify-center my-4 mb-8 gap-x-2"
							>
								<h4 className="text-xl font-semibold text-center uppercase text-darkBlue">
									Error Message: Something went wrong with creating your item.
									Please try again.
								</h4>
							</motion.div>
						) : (
							<motion.h3
								initial={initialTwo}
								whileInView={fadeIn}
								viewport={{once: true}}
								className="mx-auto mb-16 text-xl font-semibold text-center uppercase sm:text-2xl"
							>
								Create a Item
							</motion.h3>
						)}

						<motion.div
							initial={initial}
							whileInView={stagger}
							viewport={{once: true}}
							className="flex flex-col gap-4"
						>
							<div className="grid grid-cols-2 gap-y-8">
								{/* General Information */}
								<div>
									<motion.h3
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className="font-semibold text-medium text-darkBlue"
									>
										General Information
									</motion.h3>
									<Paragraph
										content={`<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium et quas molestias excepturi sint occaecati cupiditate non provident.</p>`}
										tailwindStyling="mt-2 text-black text-center lg:text-left max-w-sm"
									/>
								</div>
								<div className="flex flex-col flex-wrap gap-4 lg:flex-row">
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.itemName && formik?.errors?.itemName ? (
											<span className="py-1 text-left text-tiny text-darkBlue">
												{formik?.errors?.itemName}
											</span>
										) : null}
										<label>Item Name</label>
										<Field
											id="itemName"
											name="itemName"
											placeholder="Item Name"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.itemName}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.value && formik?.errors?.value ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.value}
											</span>
										) : null}
										<label>Value</label>
										<Field
											id="value"
											name="value"
											placeholder="Item Value"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.value}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.errors?.quantity ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.quantity}
											</span>
										) : null}
										<label>Quantity</label>
										<Field
											id="quantity"
											name="quantity"
											type="quantity"
											placeholder="Quantity"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.quantity}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.category && formik?.errors?.category ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.category}
											</span>
										) : null}
										<label>Category</label>
										<Field
											id="category"
											name="category"
											type="text"
											placeholder="Category"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.category}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col w-full gap-2"
									>
										{formik?.touched?.description &&
										formik?.errors?.description ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.description}
											</span>
										) : null}
										<label>Description</label>
										<textarea
											rows={5}
											id="description"
											name="description"
											placeholder="Description"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.description}
										/>
									</motion.div>
								</div>
								{/* Location Information */}
								<div>
									<motion.h3
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className="font-semibold text-medium text-darkBlue"
									>
										Location Information
									</motion.h3>
									<Paragraph
										content={`<p>At vero quas molestias excepturi sint occaecati cupiditate.</p>`}
										tailwindStyling="mt-2 text-black text-center lg:text-left max-w-sm"
									/>
								</div>
								<div className="flex flex-col flex-wrap gap-4 lg:flex-row">
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.value && formik?.errors?.value ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.value}
											</span>
										) : null}
										<label>Location</label>
										<Field
											id="value"
											name="value"
											placeholder="Location"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.value}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col w-full gap-2"
									>
										{formik?.touched?.description &&
										formik?.errors?.description ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.description}
											</span>
										) : null}
										<label>Location Description</label>
										<textarea
											rows={5}
											id="description"
											name="description"
											placeholder="Example: Behind the blue container."
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.description}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.errors?.quantity ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.quantity}
											</span>
										) : null}
										<label>Address Line 1</label>
										<Field
											id="quantity"
											name="quantity"
											type="quantity"
											placeholder="Address Line 1"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.quantity}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.category && formik?.errors?.category ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.category}
											</span>
										) : null}
										<label>Address Line 2</label>
										<Field
											id="category"
											name="category"
											type="text"
											placeholder="Address Line 2"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.category}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.category && formik?.errors?.category ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.category}
											</span>
										) : null}
										<label>Postcode</label>
										<Field
											id="category"
											name="category"
											type="text"
											placeholder="Postcode"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.category}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.category && formik?.errors?.category ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.category}
											</span>
										) : null}
										<label>City</label>
										<Field
											id="category"
											name="category"
											type="text"
											placeholder="City"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.category}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.category && formik?.errors?.category ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.category}
											</span>
										) : null}
										<label>Country</label>
										<Field
											id="category"
											name="category"
											type="text"
											placeholder="Country"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.category}
										/>
									</motion.div>
								</div>
								{/* Image Information */}
								<div>
									<motion.h3
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className="font-semibold text-medium text-darkBlue"
									>
										Image Information
									</motion.h3>
									<Paragraph
										content={`<p>At vero quas molestias excepturi sint occaecati cupiditate. when our power of choice is untrammelled.</p>`}
										tailwindStyling="mt-2 text-black text-center lg:text-left max-w-sm"
									/>
								</div>
								<div className="flex flex-col flex-wrap gap-4 lg:flex-row">
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.itemName && formik?.errors?.itemName ? (
											<span className="py-1 text-left text-tiny text-darkBlue">
												{formik?.errors?.itemName}
											</span>
										) : null}
										<label>Item Name</label>
										<Field
											id="itemName"
											name="itemName"
											placeholder="Item Name"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.itemName}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.value && formik?.errors?.value ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.value}
											</span>
										) : null}
										<label>Value</label>
										<Field
											id="value"
											name="value"
											placeholder="Item Value"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.value}
										/>
									</motion.div>
								</div>
								{/* Dimensions Information */}
								<div>
									<motion.h3
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: true}}
										className="font-semibold text-medium text-darkBlue"
									>
										Dimensions Information
									</motion.h3>
									<Paragraph
										content={`<p>At vero quas molestias excepturi sint occaecati cupiditate. when our power of what we like best, every pleasure is to be welcomed and every pain avoided.</p>`}
										tailwindStyling="mt-2 text-black text-center lg:text-left max-w-sm"
									/>
								</div>
								<div className="flex flex-col flex-wrap gap-4 lg:flex-row">
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.itemName && formik?.errors?.itemName ? (
											<span className="py-1 text-left text-tiny text-darkBlue">
												{formik?.errors?.itemName}
											</span>
										) : null}
										<label>General Sizes</label>
										<Field
											id="itemName"
											name="itemName"
											placeholder="Item Name"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.itemName}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.touched?.value && formik?.errors?.value ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.value}
											</span>
										) : null}
										<label>Width</label>
										<Field
											id="value"
											name="value"
											placeholder="Width"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.value}
										/>
									</motion.div>
									<motion.div
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className="flex flex-col gap-2 w-fit"
									>
										{formik?.errors?.quantity ? (
											<span className="py-1 text-left text-tiny text-darkBlue font-[400]">
												{formik?.errors?.quantity}
											</span>
										) : null}
										<label>Height</label>
										<Field
											id="quantity"
											name="quantity"
											type="quantity"
											placeholder="Height"
											onBlur={formik?.handleBlur}
											onChange={formik?.handleChange}
											value={formik?.values?.quantity}
										/>
									</motion.div>
								</div>
							</div>

							<motion.button
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								onClick={onFormSubmit}
								disabled={!formik?.values?.itemName}
								className="w-full max-w-xs text-white disabled:bg-opacity-20 disabled:cursor-not-allowed"
								type="submit"
							>
								<span
									className={
										messageSent
											? `${styles.messageSent}`
											: `${styles.submitButton}`
									}
								>
									<span className={styles.span}>
										<svg
											width="45px"
											height="15px"
											viewBox="0 0 66 43"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g
												id="arrow"
												stroke="none"
												strokeWidth="1"
												fill="none"
												fillRule="evenodd"
											>
												<path
													className={styles.one}
													d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
													fill="#FFFFFF"
												></path>
												<path
													className={styles.two}
													d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
													fill="#FFFFFF"
												></path>
												<path
													className={styles.three}
													d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
													fill="#FFFFFF"
												></path>
											</g>
										</svg>
									</span>
									<h3 className="tracking-widest text-white uppercase sm:tracking-wider sm:text-medium">
										{loading
											? "Creating Item..."
											: messageSent
											? "Item Created!"
											: errorMessage
											? "Creating Error!"
											: "Create Item"}
									</h3>
								</span>
							</motion.button>
						</motion.div>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default CreateItem;

//Ekanm/UZ!+9sM+V
