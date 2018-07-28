# Form Serializer

I had a need to create a bunch of forms with predictable data structure. This tool was created to break down the `name` attribute of a form element and turn that into an object, no matter the complexity. Also, needed a way to turn an object into form values in order to quickly update an entry if necessary.

## Markup

The idea of this tool is to be as flexible as possible. You pass in all the form element you require and provide a name attribute with the desired object structure, using a dot (.) as a separator.

```HTML
<input type="text" name="info.firstName" />
```

This would result in the following object.

```JavaScript
{
    info: {
        firstName: "VALUE"
    }
}
```

The object can be as deep or shallow as your data structure requires. For example:

```HTML
<input type="text" name="user.details.geo.location.coords.lat" />
```

The above would result in the following object;

```JavaScript
{
    user : {
        details : {
            geo: {
                location: {
                    coords: {
                        lat: "VALUE"
                    }
                }
            }
        }
    }
}
```

## API

You have three public methods at your disposal.

- formToJSON
- jsonToForm
- resetForm

## Usage

```JavaScript
const form = new FormSerializer('[type="text"]');
const submitBtn = document.querySelector('#submit');

submit.addEventListener('click', e => {
    e.preventDefault();
    const data = form.formToJSON();
    fetch('path/to/api', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
});
```

```JavaScript
const form = new FormSerializer('[type="text"]');
const displayBtn = document.querySelector('#display');

displayBtn.addEventListener('click', e => {
    e.preventDefault();
    fetch('path/to/api')
        .then(resp => resp.json())
        .then(json => form.jsonToForm(json));
});
```
