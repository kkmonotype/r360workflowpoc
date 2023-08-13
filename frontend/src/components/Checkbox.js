import React, { useState } from 'react';

const Checkbox = ({ label,isChecked,onChange }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className='checkboxes'
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
