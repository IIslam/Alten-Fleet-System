import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from "react-bootstrap";
import _ from 'lodash';

export class VehiclesTable extends Component {
  render() {
    const { vehicles } = this.props;
    return (
      <Table className="vehicles-table" striped responsive hover>
        <thead>
          <tr>
            <th>Client</th>
            <th>VIN</th>
            <th>Reg. nr.</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(vehicles, (vehicle, k) => (
              <tr key={k}>
                <td>{vehicle.custumerName}</td>
                <td>{vehicle.vin}</td>
                <td>{vehicle.registration}</td>
                <td>{vehicle.status}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}

VehiclesTable.propTypes = {
  vehicles: PropTypes.array.isRequired,
}

export default VehiclesTable