console.clear();
const DeepObjects = function (opts) {
  const inputs = document.querySelectorAll(opts.inputs);
  let finalObj;

  function getFormValues() {
    finalObj = {};
    inputs.forEach(input => {
      const keys = input.name.split(".");
      const lastKey = keys.pop();
      const lastObj = keys.reduce(
        (obj, key) => (obj[key] = obj[key] || {}),
        finalObj
      );

      if (input.type == "checkbox") {
        if (!input.checked) return;
        if (!lastObj[lastKey]) lastObj[lastKey] = [];
        lastObj[lastKey].push(input.value);
        return;
      }

      if (input.type == "radio") {
        if (!input.checked) return;
        lastObj[lastKey] = input.value;
        return;
      }

      if (input.type == "textarea") {
        lastObj[lastKey] = input.value.split("; ");
        return;
      }

      lastObj[lastKey] = input.value;
    });

    return finalObj;
  }

  function getValues() {

  }

  function uploadValues(opts) {
    if (!opts.url) throw new Error('Need some place to put the data');
    if (!opts.data) throw new Error('Need to know what to save');
    fetch(opts.url, {
      method: 'POST',
      body: JSON.stringify(opts.data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }

  function displayValues(data) {
    inputs.forEach(input => {
      const keys = input.name.split(".");
      const value = keys.reduce(
        (prev, curr) => (prev ? prev[curr] : null),
        data
      );

      if (input.type == "radio") {
        if (input.value != value) return;
        input.checked = true;
        return;
      }

      if (input.type == "checkbox") {
        value.forEach(v => {
          if (input.value != v) return;
          input.checked = true;
          return;
        });
        return;
      }

      if (input.type == "textarea") {
        if (Array.isArray(value)) {
          input.value = value
            .map((val, i) => (i < value.length - 1 ? `${val}; ` : val))
            .join("");
          return;
        }
      }

      if (Array.isArray(value)) {
        input.value = value
          .map((val, i) => (i < value.length - 1 ? `${val}; ` : val))
          .join("");
        return;
      }

      input.value = value;
    });
  }

  return {
    uploadValues: uploadValues,
    getValues: getValues,
    getFormValues: getFormValues,
    displayValues: displayValues
  };
};

