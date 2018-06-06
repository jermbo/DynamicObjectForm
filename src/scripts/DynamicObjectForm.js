/*
const possibleData = {
    bio: {
        name: 'Aang',
        alternativeNames: ['Kuzon', 'Twinkel Toes', 'Sweetie'],
        nationality: 'Southern Air Tempel',
        ethnicity: 'Air Nomad',
        born: '12 BG',
        died: '152 AG',
    },
    physicialDescription : {
        gender: 'Male',
        eyeColor: 'Gray',
        hairColor: 'Dark Brown',
        skinColor: 'Light',
        images: ['https://vignette.wikia.nocookie.net/avatar/images/a/ae/Aang_at_Jasmine_Dragon.png/revision/latest?cb=20130612174003']
    },
    personalInformation: {
        weapons: ['Glider Staff', 'The Elements'],
        fightingStyles: ['Airbending', 'Waterbending', 'Earthbending', 'Firebending', 'Energybending']
    }
};
*/
const fakeData = {
  name: {
    first: "jermbo",
    middle: "t",
    last: "last",
    prefix: "mr",
    suffix: "iii."
  },
  check: {
    test: ["test1", "test2"]
  },
  info: { age: 33, gender: "m", species: "human" },
  occupation: "developer",
  sayings: [
    "this is a story all about how...",
    "my life got flipped, turned upside down...",
    "and id like to take a minute just sitting right there...",
    "ill tell you how i became the prince of bel air..."
  ]
};
console.clear();
const DeepObjects = function(opts) {
  const inputs = document.querySelectorAll(opts.inputs);
  let finalObj;

  function getValues() {
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

    console.log(finalObj);
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
    getValues: getValues,
    displayValues: displayValues
  };
};