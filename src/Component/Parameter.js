import React, { useState } from 'react';
import './Parameter.css';
import { NavLink } from 'react-router-dom';

function Parameter() {
  const [shape, setShape] = useState('square');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedWidth = parseInt(width);
    const parsedHeight = parseInt(height);
    if (parsedWidth < 10 || parsedHeight < 0) {
      alert('Width and height should be positive values && the value of the width should be greater than 9');
    } else {
      localStorage.setItem('shape', shape);
      localStorage.setItem('width', parsedWidth);
      localStorage.setItem('height', parsedHeight);
      window.location.href = "/CustomDesign";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container5">
        <h1 className="text-center1"><b>Input Parameters </b></h1>
        
        <div className="form-group row">
          {/* <label htmlFor="shape" className="col-sm-2 col-form-label" style={{marginLeft:"30px"}}>Shape</label> */}
          <div className="col-sm-10">
          <select id="shape" className="form-control" value={shape} onChange={(e) => setShape(e.target.value)} style={{ width: "225px", marginLeft:"60px" }}>
        <option value="" disabled selected>Select a shape</option>
  {/* <option value="circle">Circle</option> */}
        <option value="square">Square</option>
  {/* <option value="triangle">Triangle</option> */}
      </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="width" className="col-sm-2 col-form-label">Width</label>
          <div className="col-sm-10">
            <input type="number" id="width" className="form-control" value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="height" className="col-sm-2 col-form-label">Height</label>
          <div className="col-sm-10">
            <input type="number" id="height" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
        </div>
        <div className='submit text-center'>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Parameter;
