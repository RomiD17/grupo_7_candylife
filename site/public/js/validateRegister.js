const elFormulario = document.querySelector('form');

let camposDelFormulario = Array.from(elFormulario.elements);

// Sacamos al botón del array de campos
camposDelFormulario.pop();

let camposConError = {};

// Generic validate function
function validateInput(message, input, typeOfValidator) {
	// Capturamos el valor del campo
	let valorDelCampo = input.value.trim();
	// trim() es un método que elimina los espacios vacíos al principio y al final

	let validation;
	
	switch (typeOfValidator) {
		case 'isEmail':
			validation = !validator[typeOfValidator](valorDelCampo);
			break;
		default:
			validation = validator[typeOfValidator](valorDelCampo);
			break;
	}

	// si no se pasa la validación
	if (validation) {
		// Si el campo tiene error, agregamos la clase de boostrap 'is-invalid'
		input.classList.add('is-invalid');
		// Insertamos un mensaje de error en el div 'invalid-feedback'
		input.nextElementSibling.innerHTML = `El campo <b>${input.getAttribute('data-name')}</b> ${message}`;
		// Al objeto literal de errores, la asignamos una prop con el nombre del campo y valor true
		camposConError[input.name] = true;
	} else {
		// Cuando no hay error, eliminamos la clase por si la tuviera
		input.classList.remove('is-invalid');
		input.classList.add('is-valid');
		// Eliminamos el mensaje de error en el div 'invalid-feedback'
		input.nextElementSibling.innerHTML = '';
		// Al objeto literal de errores, le eliminamos la prop del campo que tenía error
		delete camposConError[input.name];
	}
}

// Iteramos sobre el array de campos
for (const unCampo of camposDelFormulario) {
	// A cada campo le pasamos el evento blur
	unCampo.addEventListener('blur', function () {
		validateInput('es obligatorio', this, 'isEmpty');
	});

	// Si el nombre del campo es 'email'
	if (unCampo.name === 'email') {	
		unCampo.addEventListener('blur', function () {
			if (!validator.isEmpty(unCampo.value)) {
				validateInput('debe contener un formato de correo electrónico', this, 'isEmail');
			}
		})
	}
}

elFormulario.addEventListener('submit', function (event) {
	// verificamos SI hay campos vacíos
	for (const unCampo of camposDelFormulario) {
		let valorDelCampo = unCampo.value.trim();
		if (validator.isEmpty(valorDelCampo)) {
			camposConError[unCampo.name] = true;
		}
	}

	console.log(camposConError);	

	if (Object.keys(camposConError).length > 0) {
		event.preventDefault();
		alert('Hay campos con errores'); 
	}
})