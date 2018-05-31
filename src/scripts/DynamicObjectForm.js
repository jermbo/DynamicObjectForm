/*
// console.clear();

// const inputs = document.querySelectorAll('[type="text"], select, [type="radio"], [type="checkbox"] [name="sayings"]'),
//   submitBtn = document.querySelector('#submit'),
//   displayBtn = document.querySelector('#display');
// let finalObj = {},
//   fakeData = {
//     name: { first: 'jermbo', middle: 't', last: 'last', prefix: 'mr', suffix: 'esq.' },
//     info: { age: 22, gender: 'm', species: 'human' },
//     occupation: 'developer',
//     sayings: [ 'this is a story all about how', 'my life got flipped, turned upside down', 'and id like to take a minute just sitting right there', 'ill tell you how i became the prince of bel air' ]
//   };

// submitBtn.addEventListener('click', getValues);
// displayBtn.addEventListener('click', displayValues);

// // displayValues();
// // getValues();

// function getValues() {
//   inputs.forEach(input => {
//     if (input.name == 'sayings') {
//       finalObj[input.name] = input.value.split('; ');
//     } else {
//       // https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
//       const keys = input.name.split('.');
//       const lastKey = keys.pop();
//       const lastObj = keys.reduce((obj, key) => obj[key] = obj[key] || {}, finalObj);
//       lastObj[lastKey] = input.value;
//     }
//   });
//   console.log(finalObj);
// }

// function displayValues() {
//   inputs.forEach(input => {
//     if (input.name == 'sayings') {
//       input.value = fakeData[input.name].map((val, i) => (i < fakeData[input.name].length - 1) ? `${val}; ` : val ).join('');
//     } else {
//       const keys = input.name.split('.');
//       const val= keys.reduce((prev, curr) => prev ? prev[curr] : null, fakeData);
//       if( input.type == 'radio' && input.value == val ){
//         input.checked = true;
//       }
//       input.value = val;
//     }
//   });
// }
*/

console.clear();
const DeepObjects = function (opts) {
  let finalObj;
  /* const fakeData = {
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
    selectTest: '',
    info: {
      age: 22,
      gender: "m",
      species: "human"
    },
    occupation: "developer",
    sayings: [
      "this is a story all about how",
      "my life got flipped, turned upside down",
      "and id like to take a minute just sitting right there",
      "ill tell you how i became the prince of bel air"
    ]
  };

  const inputs = document.querySelectorAll(opts.inputs);
  const submitBtn = document.querySelector(opts.submitBtn);
  const displayBtn = document.querySelector(opts.displayBtn);

  function init() {
    console.log("init");
    addEventListeners();
  }

  function addEventListeners() {
    submitBtn.addEventListener("click", getValues);
    displayBtn.addEventListener("click", displayValues);
  }

  function getValues(e) {
    e.preventDefault();
    console.log("get values");
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

  function displayValues(e) {
    e.preventDefault();
    console.log("display values");

    inputs.forEach(input => {
      const keys = input.name.split(".");
      const value = keys.reduce(
        (prev, curr) => (prev ? prev[curr] : null),
        fakeData
      );

      if (input.type == "radio"){
        if (input.value != value) return;
        input.checked = true;
        return;
      }

      if (input.type == "checkbox") {
        value.forEach(val => {
          if (input.value == val) {
            input.checked = true;
            return;
          }
        });
        return;
      }

      if (Array.isArray(value)) {
        input.value = value.map(
          (val, i) => (i < value.length - 1 ? `${val}; ` : val)
        ).join('');
        return;
      }

      input.value = value
    });
  }

  init();
};

const start = new DeepObjects({
  inputs: '[type="text"], textarea, select, [type="radio"], [type="checkbox"]',
  submitBtn: "#submit",
  displayBtn: "#display",
});