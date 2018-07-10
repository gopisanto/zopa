import React from 'react';
import DonutChart from 'react-svg-donut-chart';
import PropTypes from 'prop-types';

const AccountChart = ({ totalSent, totalLeft }) => (
  <div className="account-chart">
    <DonutChart
      data={[
        {
          value: totalSent,
          stroke: '#ECE3EB',
          strokeWidth: 10,
        },
        {
          value: totalLeft,
          stroke: '#FDB424',
          strokeWidth: 10,
        },
      ]}
    />
  </div>
);

AccountChart.propTypes = {
  totalLeft: PropTypes.number.isRequired,
  totalSent: PropTypes.number.isRequired,
};

export default AccountChart;
