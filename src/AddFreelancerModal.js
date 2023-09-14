import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";

const getEmptyForm = () => ({
	id: Math.random().toString(36).substr(2, 9),
	freelancer: "",
	willowLink: "",
	upworkProfile: "",
	website: "",
	"performance-desktop": 0,
	"accessibiltiy-desktop": 0,
	"best practices-desktop": 0,
	"seo-desktop": 0,
	"performance-mobile": 0,
	"accessibiltiy-mobile": 0,
	"best practices-mobile": 0,
	"seo-mobile": 0,
});

function AddFreelancerModal({
	addOrUpdateFreelancer,
	editingFreelancer,
	open,
	handleOpen,
	cancelEdit,
}) {
	const [formData, setFormData] = useState(editingFreelancer || getEmptyForm());

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value === "" ? "" : isNaN(value) ? value : Number(value),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form data submitted:", formData);

		addOrUpdateFreelancer(formData);
		setFormData(getEmptyForm());

		handleOpen();
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
							<div className="flex items-center justify-between" key={field}>
								<label htmlFor={field} className="text-sm font-medium">
									{label}
								</label>
								<input
									type={type}
									id={field}
									name={field}
									className="w-2/3 p-2 rounded-md bg-gray-800 text-white"
									onChange={handleChange}
									value={formData[field]}
								/>
							</div>
						))}
						<button
							type="submit"
							onClick={cancelEdit}
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
					</form>
				</DialogBody>
			</Dialog>
		</>
	);
}

export default AddFreelancerModal;
