import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";

function AddFreelancerModal(props) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});

	const handleOpen = () => setOpen(!open);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form data submitted:", formData);

		const newFreelancer = {
			freelancer: formData.freelancer,
			willowLink: formData.willowLink,
			upworkProfile: formData.upworkProfile,
			website: formData.website,
			"performance-desktop": formData["performance-desktop"],
			"accessibiltiy-desktop": formData["accessibiltiy-desktop"],
			"best practices-desktop": formData["best practices-desktop"],
			"seo-desktop": formData["seo-desktop"],
			"performance-mobile": formData["performance-mobile"],
			"accessibiltiy-mobile": formData["accessibiltiy-mobile"],
			"best practices-mobile": formData["best practices-mobile"],
			"seo-mobile": formData["seo-mobile"],
		};

		props.addFreelancer(newFreelancer);

		handleOpen(); // close the modal after submission
	};

	useEffect(() => {
		console.log("Form data updated:", formData);
	}, [formData]);

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Freelancer
			</button>
			<Dialog
				open={open}
				handler={handleOpen}
				className="w-1/2 bg-gray-900 text-white rounded-lg shadow-lg border-2 border-gray-700 mx-auto mt-5"
			>
				<DialogHeader className="text-lg font-semibold bg-gray-800 p-4 rounded-t-lg">
					Add Freelancer
				</DialogHeader>
				<DialogBody className="p-4">
					<form className="space-y-4" onSubmit={handleSubmit}>
						{[
							{
								field: "freelancer",
								label: "Freelancer",
								type: "text",
							},
							{
								field: "upworkProfile",
								label: "Upwork Profile",
								type: "text",
							},
							{
								field: "willowLink",
								label: "Willow Link",
								type: "text",
							},
							{
								field: "website",
								label: "Website",
								type: "text",
							},
							{
								field: "performance-desktop",
								label: "Performance (Desktop)",
								type: "number",
							},
							{
								field: "accessibiltiy-desktop",
								label: "Accessibiltiy (Desktop)",
								type: "number",
							},
							{
								field: "best practices-desktop",
								label: "Best Practices (Desktop)",
								type: "number",
							},
							{
								field: "seo-desktop",
								label: "SEO (Desktop)",
								type: "number",
							},
							{
								field: "performance-mobile",
								label: "Performance (Mobile)",
								type: "number",
							},
							{
								field: "accessibiltiy-mobile",
								label: "Accessibiltiy (Mobile)",
								type: "number",
							},
							{
								field: "best practices-mobile",
								label: "Best Practices (Mobile)",
								type: "number",
							},
							{
								field: "seo-mobile",
								label: "SEO (Mobile)",
								type: "number",
							},
						].map(({ field, label, type }) => (
							<div className="flex items-center justify-between">
								<label htmlFor={field} className="text-sm font-medium">
									{label}
								</label>
								<input
									type={type}
									id={field}
									name={field}
									className="w-2/3 p-2 rounded-md bg-gray-800 text-white"
									onChange={handleChange}
								/>
							</div>
						))}
						{/* Add additional fields here in the same manner */}
					</form>
				</DialogBody>
				<DialogFooter className="bg-gray-800 p-4 rounded-b-lg">
					<button
						onClick={handleOpen}
						className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Save
					</button>
				</DialogFooter>
			</Dialog>
		</>
	);
}

export default AddFreelancerModal;
