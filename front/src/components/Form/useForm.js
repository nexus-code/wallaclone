import { useReducer } from 'react';

/**
 * 
 * @param {*} initialArgs : object with form data
 * @param {*} handleSubmitCallback : update/create logic on parent. IMPORTANT must return 'Ok' or 'ERROR'
 */

const useForm = (initialArgs, handleSubmitCallback) => {


  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialArgs
  );


  const handleChange = event => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormInput({ [name]: newValue });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    return await handleSubmitCallback();
  }


  return [
    handleChange,
    handleSubmit,
    formInput,
  ];
};

export default useForm;