import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import update from 'immutability-helper';
import ReactDataGrid from 'react-data-grid';
import TableService from './TableService';
import './Table.css';

const service = TableService();

class EditableTable extends Component {
	constructor(props) {
		super(props);
		this.state = { rows: [], columns: [], selectedIndexes: [], tableName: props.tableName, dateValue: '' };
		if (props.tableName !== 'Visits Details') {
			this.initTableData(props.tableName);
		} else {
			this.setState({rows: [], columns: []})
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({tableName: nextProps.tableName});
		if (nextProps.tableName !== 'Visits Details') {
			this.initTableData(nextProps.tableName);
		} else {
			this.setState({rows: [], columns: []})
		}
	}

	initTableData  = (tableName) => {
		service.getTableRecords(tableName).then((res) => {
			this.prepareTableData(res);
		});
	};

	rowGetter = (i) => {
		return this.state.rows[i];
	};

	handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		let rows = this.state.rows.slice();

		for (let i = fromRow; i <= toRow; i++) {
			let rowToUpdate = rows[i];
			const updatedRow = update(rowToUpdate, {$merge: updated});
			rows[i] = updatedRow;
		}

		this.setState({ rows });
	};

	onRowsSelected = (rows) => {
		this.state.selectedIndexes.push(rows[0].rowIdx);
	};

	onRowsDeselected = (rows) => {
		this.setState((state) => ({
			selectedIndexes: state.selectedIndexes.filter(row => rows[0].rowIdx !== row)
		}));
	};

	updateRows = () => {
		const rowsToUpdate = this.getSelectedRows();
		service.updateTableRecords(this.state.tableName, rowsToUpdate).then((res) => {
			this.prepareTableData(res);
		});
	};

	deleteRow = () => {
		const rowsToDelete = this.getSelectedRows().map((row) => row.ID);
		service.deleteTableRecords(this.state.tableName, rowsToDelete).then((res) => {
			this.prepareTableData(res);
		});
	};

	getSelectedRows = () => {
		return this.state.rows.filter((row, index) => this.state.selectedIndexes.includes(index));
	};

	filterData = () => {
		service.filterRecords(this.state.tableName, this.state.dateValue).then((res) => {
			this.prepareTableData(res);
		});
	};

	prepareTableData = (res) => {
		const emptyRow = {};
		res.columns.forEach((column) => {
			emptyRow[column] = null;
		});
		res.rows.push(emptyRow);
		this.setState({
			rows: res.rows,
			columns: res.columns
		})
	};

	handleChange = (event) => {
		this.setState({dateValue: event.target.value.toUpperCase()});
	};

	render() {
		return  (
			<div>
				<ReactDataGrid
					enableCellSelect={true}
					columns={this.state.columns}
					rowGetter={this.rowGetter}
					rowsCount={this.state.rows.length}
					minHeight={500}
					onGridRowsUpdated={this.handleGridRowsUpdated}
					rowSelection={{
						showCheckbox: true,
						onRowsSelected: this.onRowsSelected,
						onRowsDeselected: this.onRowsDeselected,
						selectBy: {
							indexes: this.state.selectedIndexes
						}
					}}
				/>
				<div className="button-panel">
					{this.state.tableName === 'Visits Details' ?
						<span>
							<label>Date: </label>
							<input type="text" value={this.state.dateValue} onChange={this.handleChange}></input>
							<button className="action-button" onClick={this.filterData}>Filter</button>
						</span>
						: ''
					}
					<button className="action-button" onClick={this.updateRows}>Apply (Edit)</button>
					<button className="action-button" onClick={this.deleteRow}>Delete</button>
				</div>
			</div>);
	}
}

EditableTable.propTypes = {
	tableName: PropTypes.string
};

export default EditableTable;