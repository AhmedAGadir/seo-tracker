import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import AddFreelancerModal from "./AddFreelancerModal";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css";

function LinkRenderer(props) {
	const { value } = props;
	return (
		<div>
			<a
				href={value}
				target="_blank"
				rel="noreferrer"
				className="text-blue-600 hover:text-blue-800"
			>
				{value}
			</a>
		</div>
	);
}

function MetricRenderer(props) {
	const { value } = props;

	return (
		<div>
			<span
				style={{
					color: value < 30 ? "red" : value < 60 ? "orange" : "green",
				}}
			>
				{value}
			</span>
		</div>
	);
}

function App() {
	const [rowData, setRowData] = useState([
		// fetch from local storage, if not there hard code 1 freelancer
		...(JSON.parse(localStorage.getItem("rowData")) ||
			[
				// {
				// 	freelancer: "John Doe",
				// 	upworkProfile: "https://www.upwork.com/freelancers/~01a234b56c789d0123",
				// 	willowLink: "https://willowtreeapps.com/",
				// 	website: "https://www.johndoe.com",
				// 	"performance-desktop": 100,
				// 	"accessibiltiy-desktop": 90,
				// 	"best practices-desktop": 60,
				// 	"seo-desktop": 50,
				// 	"performance-mobile": 40,
				// 	"accessibiltiy-mobile": 90,
				// 	"best practices-mobile": 60,
				// 	"seo-mobile": 70,
				// },
				// {
				// 	freelancer: "Jane Doe",
				// 	upworkProfile: "https://www.upwork.com/freelancers/~01a234b56c789d0123",
				// 	willowLink: "https://willowtreeapps.com/",
				// 	website: "https://www.johndoe.com",
				// 	"performance-desktop": 40,
				// 	"accessibiltiy-desktop": 50,
				// 	"best practices-desktop": 100,
				// 	"seo-desktop": 20,
				// 	"performance-mobile": 30,
				// 	"accessibiltiy-mobile": 10,
				// 	"best practices-mobile": 90,
				// 	"seo-mobile": 60,
				// },
			]),
	]);

	useEffect(() => {
		// save to local storage on change
		localStorage.setItem("rowData", JSON.stringify(rowData));
	}, [rowData]);

	const [columnDefs] = useState([
		{ field: "freelancer", minWidth: 200 },
		{ field: "upworkProfile", minWidth: 200, cellRenderer: LinkRenderer },
		{ field: "willowLink", minWidth: 200, cellRenderer: LinkRenderer },
		{ field: "website", minWidth: 220, cellRenderer: LinkRenderer },
		{
			headerName: "Desktop",
			children: [
				{
					field: "performance-desktop",
					headerName: "Performance",
					cellRenderer: MetricRenderer,
				},
				{
					field: "accessibiltiy-desktop",
					headerName: "Accessibiltiy",
					cellRenderer: MetricRenderer,
				},
				{
					field: "best practices-desktop",
					headerName: "Best Practices",
					cellRenderer: MetricRenderer,
				},
				{
					field: "seo-desktop",
					headerName: "SEO",
					cellRenderer: MetricRenderer,
				},
			],
		},
		{
			headerName: "Mobile",
			children: [
				{
					field: "performance-mobile",
					headerName: "Performance",
					cellRenderer: MetricRenderer,
				},
				{
					field: "accessibiltiy-mobile",
					headerName: "Accessibiltiy",
					cellRenderer: MetricRenderer,
				},
				{
					field: "best practices-mobile",
					headerName: "Best Practices",
					cellRenderer: MetricRenderer,
				},
				{
					field: "seo-mobile",
					headerName: "SEO",
					cellRenderer: MetricRenderer,
				},
			],
		},
	]);

	const onGridReady = (params) => {
		params.api.sizeColumnsToFit();
	};

	const addFreelancer = (newFreelancer) => {
		console.log("newFreelancer", newFreelancer);
		setRowData([...rowData, newFreelancer]);
	};

	return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
			<AddFreelancerModal addFreelancer={addFreelancer} />

			<div className="ag-theme-alpine-dark" style={{ flex: 1, width: "100vw" }}>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					onGridReady={onGridReady}
					defaultColDef={{
						sortable: true,
						filter: true,
						resizable: true,
					}}
				></AgGridReact>
			</div>
		</div>
	);
}

export default App;
