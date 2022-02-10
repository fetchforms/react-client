import React from 'react';
import { FetchForm, FetchFormsProvider } from '../lib/index';

const ManagedForm = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(1000);
    // Your logic here
    console.log('return values', values);
  };
  return (
    <div className=''>
      <FetchFormsProvider permission={process.env.REACT_APP_FF_TOKEN}>
        <div className='text-3xl'>Managed Form</div>
        <p className='text-gray-500'>
          The easiest way to use Fetch Forms. Pass in a form slug and we'll do
          the rest.
        </p>
        <br />
        <div>
          <FetchForm
            slug={process.env.REACT_APP_FF_FORM_ID}
            onSubmit={onSubmit}
          />
        </div>
      </FetchFormsProvider>
    </div>
  );
};

export default ManagedForm;
