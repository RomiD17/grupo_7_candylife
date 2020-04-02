import React from 'react';
import PropTypes from 'prop-types';


function Metric(props){
  console.log(props)
  return(
    <div className="col-md-4 mb-4">
      <div className={`card ${props.color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold ${props.textcolor} text-uppercase mb-1`}> {props.title}</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{props.quantity}</div>
            </div>
            <div className="col-auto">
              <i className={props.icon}></i> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Metric.propTypes = {
  color:  PropTypes.string,
  textcolor: PropTypes.string,
  title: PropTypes.string,
  quantity : PropTypes.string,
}

export default Metric;