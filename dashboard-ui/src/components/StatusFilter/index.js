import React, { Component } from "react";
import PropTypes from "prop-types";

export class StatusFilter extends Component {
  render() {
    const { handleStatus, status } = this.props;
    return (
      <select
        onChange={handleStatus}
        value={status}
        className="form-control"
        test-id="status-select"
      >
        <option name="all" value="">
          All
        </option>
        <option name="connected" value="connected">
          Connected
        </option>
        <option name="not connected" value="not-connected">
          Not Connected
        </option>
      </select>
    );
  }
}

StatusFilter.propTypes = {
  handleStatus: PropTypes.func.isRequired,
  status: PropTypes.string
};

export default StatusFilter;
