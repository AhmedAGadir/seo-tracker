import React, { useState, useMemo, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import AddFreelancerModal from "./AddFreelancerModal";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import "./App.css";

function ActionsRenderer(props) {
	const {
		// editFreelancer,
		deleteFreelancer,
		data,
	} = props;
	return (
		<div className="flex flex-row justify-between align-middle mt-3">
			{/* <span
				className="text-gray-600 hover:text-blue-800 cursor-pointer"
				onClick={() => {
					editFreelancer(data.id);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
			</span> */}
			<span
				className="text-gray-600 hover:text-red-800 cursor-pointer"
				onClick={() => {
					deleteFreelancer(data.id);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</span>
		</div>
	);
}

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
				{/* format link to remove the http/https/www.*/}
				{value.replace(/(^\w+:|^)\/\//, "").replace(/www./, "")}
			</a>
		</div>
	);
}

function MetricRenderer(props) {
	const { value } = props;

	return (
		<div>
			<span
				className={
					value < 33
						? "text-red-600 text-bold mt-1 inline-block"
						: value < 66
						? "text-yellow-600 text-bold mt-1 inline-block"
						: "text-green-600 text-bold mt-1 inline-block"
				}
			>
				{value}
			</span>
		</div>
	);
}

function App() {
	const [rowData, setRowData] = useState([
		...(JSON.parse(localStorage.getItem("rowData")) || [
			{
				id: "1",
				freelancer: "John Doe",
				upworkProfile: "https://www.upwork.com/freelancers/~01a234b56c789d0123",
				willowLink: "https://willowtreeapps.com/",
				website: "https://www.johndoe.com",
				"performance-desktop": 100,
				"accessibiltiy-desktop": 90,
				"best practices-desktop": 60,
				"seo-desktop": 50,
				"performance-mobile": 40,
				"accessibiltiy-mobile": 90,
				"best practices-mobile": 60,
				"seo-mobile": 70,
			},
			{
				id: "2",
				freelancer: "Jane Doe",
				upworkProfile: "https://www.upwork.com/freelancers/~01a234b56c789d0123",
				willowLink: "https://willowtreeapps.com/",
				website: "https://www.johndoe.com",
				"performance-desktop": 40,
				"accessibiltiy-desktop": 50,
				"best practices-desktop": 100,
				"seo-desktop": 20,
				"performance-mobile": 30,
				"accessibiltiy-mobile": 10,
				"best practices-mobile": 90,
				"seo-mobile": 60,
			},
		]),
	]);
	const [editingFreelancerId, setEditingFreelancerId] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const editingFreelancer =
		rowData.find((row) => row.id === editingFreelancerId) ?? null;

	useEffect(() => {
		// save to local storage on change
		localStorage.setItem("rowData", JSON.stringify(rowData));
	}, [rowData]);

	const editFreelancer = useCallback(
		(id) => {
			setEditingFreelancerId(id);
			setModalOpen(true);
		},
		[setEditingFreelancerId, setModalOpen]
	);

	const deleteFreelancer = useCallback(
		(id) => {
			if (window.confirm("Are you sure you want to delete this freelancer?")) {
				setRowData((prevRowData) => {
					const newRowData = [...prevRowData];
					const index = newRowData.findIndex((row) => row.id === id);
					newRowData.splice(index, 1);
					return newRowData;
				});
			}
		},
		[setRowData]
	);

	const [columnDefs] = useState([
		{
			field: "freelancer",
			maxWidth: 200,
			width: 150,
			pinned: "left",
			filter: "agTextColumnFilter",
		},
		{
			field: "upworkProfile",
			minWidth: 100,
			cellRenderer: LinkRenderer,
			hide: true,
		},
		{
			field: "willowLink",
			minWidth: 100,
			cellRenderer: LinkRenderer,
			hide: true,
		},
		{ field: "website", minWidth: 120, cellRenderer: LinkRenderer, hide: true },
		{
			headerName: "Performance",
			children: [
				{
					field: "performance-desktop",
					headerName: "Desktop",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
				{
					field: "performance-mobile",
					headerName: "Mobile",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
			],
		},
		{
			headerName: "Accessibiltiy",
			children: [
				{
					field: "accessibiltiy-desktop",
					headerName: "Desktop",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
				{
					field: "accessibiltiy-mobile",
					headerName: "Mobile",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
			],
		},
		{
			headerName: "Best Practices",
			children: [
				{
					field: "best practices-desktop",
					headerName: "Desktop",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
				{
					field: "best practices-mobile",
					headerName: "Mobile",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
			],
		},
		{
			headerName: "SEO",
			children: [
				{
					field: "seo-desktop",
					headerName: "Desktop",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
				{
					field: "seo-mobile",
					headerName: "Mobile",
					cellRenderer: MetricRenderer,
					filter: "agNumberColumnFilter",
					menuTabs: ["filterMenuTab"],
				},
			],
		},
		{
			field: "actions",
			headerName: "",
			pinned: "right",
			resizable: false,
			sortable: false,
			filter: false,
			menuTabs: [],
			minWidth: 60,
			maxWidth: 60,
			cellRenderer: ActionsRenderer,
			cellRendererParams: {
				editFreelancer,
				deleteFreelancer,
			},
		},
	]);

	const onGridReady = (params) => {
		// params.columnApi.autoSizeAllColumns();
		// collapse sidebar
		params.api.closeToolPanel();
	};

	const addFreelancer = (newFreelancer) => {
		console.log("newFreelancer", newFreelancer);
		setRowData([...rowData, newFreelancer]);
	};

	const updateFreelancer = (freelancer) => {
		console.log("updatedFreelancer", freelancer);
		const index = rowData.findIndex((row) => row.id === freelancer.id);
		const newRowData = [...rowData];
		newRowData[index] = freelancer;
		setRowData(newRowData);
	};

	const addOrUpdateFreelancer = editingFreelancerId
		? updateFreelancer
		: addFreelancer;

	const cancelEdit = () => {
		setEditingFreelancerId(null);
		setModalOpen(false);
	};

	const sideBar = useMemo(() => {
		return {
			toolPanels: [
				{
					id: "columns",
					labelDefault: "Columns",
					labelKey: "columns",
					iconKey: "columns",
					toolPanel: "agColumnsToolPanel",
				},
				{
					id: "filters",
					labelDefault: "Filters",
					labelKey: "filters",
					iconKey: "filter",
					toolPanel: "agFiltersToolPanel",
				},
			],
			defaultToolPanel: "columns",
		};
	}, []);

	const onCellValueChanged = (params) => {
		console.log("rowData", rowData);
	};

	return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
			<AddFreelancerModal
				key={editingFreelancerId}
				cancelEdit={cancelEdit}
				addOrUpdateFreelancer={addOrUpdateFreelancer}
				editingFreelancer={editingFreelancer}
				isOpen={modalOpen}
				open={() => setModalOpen(true)}
				close={() => setModalOpen(false)}
			/>

			<div className="ag-theme-alpine-dark" style={{ flex: 1, width: "100vw" }}>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					onGridReady={onGridReady}
					defaultColDef={{
						sortable: true,
						filter: true,
						resizable: true,
						flex: 1,
						editable: true,
					}}
					rowHeight={50}
					sideBar={sideBar}
					onCellValueChanged={onCellValueChanged}
				></AgGridReact>
			</div>
		</div>
	);
}

export default App;
