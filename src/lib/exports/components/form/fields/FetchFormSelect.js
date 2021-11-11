import React from 'react';
import SelectField from '../elements/SelectField';
import FetchLabel from '../elements/FetchLabel';

const FetchFormSelect = ({ field }) => {
  return (
    <>
      <FetchLabel label={field.label} name={field.html.name} />
      <SelectField
        html={field.html}
        initialValue={field.initialValue}
        options={field.options}
      />
    </>
  );
};

export default FetchFormSelect;