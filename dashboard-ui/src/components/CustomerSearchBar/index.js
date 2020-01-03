import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

export class CustomerSearchBar extends Component {
  render() {
    const { customersList, handleCustomer, options } = this.props;
    return (
      <Select
        classNamePrefix="react-select"
        className="client-search"
        placeholder="Insert Client Names"
        isClearable
        value={customersList}
        onChange={handleCustomer}
        options={options}
      />
    );
  }
}

CustomerSearchBar.propTypes = {
  handleCustomer: PropTypes.func.isRequired,
  customersList: PropTypes.array,
  options: PropTypes.array
};

export default CustomerSearchBar;
