import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join();

  useEffect(() => {
    setInputs(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function handleChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      // Get first thing in files array and set it in va
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key, _value]) => [key, '']));
    setInputs(blankState);
  }

  // return the things we want to surface from custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
