import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import useFetchForms from '../hooks/useFetchForms';
import FetchFormItem from './form/FetchFormItem';
import { validate } from './form/Validations';

const FetchForm = ({ slug, showFormError, onSubmit }) => {
  const [fetchForm, loading, error] = useFetchForms(slug);
  const [validations, setValidations] = useState({});
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (fetchForm) {
      setValidations(
        fetchForm.formItems.map((item) => ({
          name: item.name,
          rules: item.validation
        }))
      );
    }
  }, [fetchForm]);

  useEffect(() => {
    if (showFormError) {
      setSubmitError(showFormError);
    }
  }, [showFormError]);

  const submitForm = async (values) => {
    setSubmitError(false);

    const formattedVals = {
      ...values
    };
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
      if (typeof values[keys[i]] !== 'boolean' && !isNaN(values[keys[i]])) {
        formattedVals[keys[i]] = parseInt(values[keys[i]]);
      } else {
        formattedVals[keys[i]] = values[keys[i]];
      }
    }

    // TODO: submit to fetch forms if cloudsave is enabled
    // show submitError
    // return setSubmitError('Age requires a valid number to be set');
    await onSubmit(formattedVals);
  };

  const errorMessage = (message) => {
    return (
      <div
        className='mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
        role='alert'
      >
        {/* <strong className='font-bold'>There's a problem! </strong> */}
        <span className='block sm:inline'>{message}</span>
      </div>
    );
  };

  return (
    <div className='fetch-form'>
      {error && errorMessage(error)}
      {loading && 'Loading...'}
      {fetchForm && (
        <Form
          onSubmit={submitForm}
          initialValues={{}}
          validate={(values) => {
            return validate(values, validations);
          }}
          render={({ handleSubmit, form, submitting, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              {fetchForm.formItems.map((formItem) => (
                <FetchFormItem formItem={formItem} key={formItem.name} />
              ))}
              {submitError && errorMessage(submitError)}
              <div className='mt-4'>
                <button
                  type='submit'
                  className={`text-white bg-brand focus:ring-4 rounded-lg px-5 py-2.5 text-center ${
                    submitting || invalid
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-100'
                  }`}
                  disabled={submitting || invalid}
                >
                  {form.submitText || 'Submit'}
                </button>
              </div>
            </form>
          )}
        />
      )}
    </div>
  );
};

export default FetchForm;