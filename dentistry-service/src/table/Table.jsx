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
		this.state = { rows: [], columns: [], selectedIndexes: [], tableName: props.tableName }
		this.initTableData(props.tableName)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tableName !== this.state.tableName) {
			console.log("new state" + nextProps.tableName);
		}
	}

	initTableData  = (tableName) => {
		service.getTableRecords(tableName).then((res) => {
			const emptyRow = {};
			res.columns.forEach((column) => {
				emptyRow[column] = null;
			});
			res.rows.push(emptyRow);
			this.setState({
				rows: res.rows,
				columns: res.columns
			})
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
		const rowsToUpdate = this.state.rows.filter((row, index) => this.state.selectedIndexes.includes(index));
		service.updateTableRecords(this.state.tableName, this.state.rows, rowsToUpdate).then((res) => {
			console.log(res);
		});
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
					<button onClick={this.updateRows}>Apply (Edit)</button>
					<button>Delete</button>
				</div>
			</div>);
	}
}

EditableTable.propTypes = {
	tableName: PropTypes.string
};

export default EditableTable;