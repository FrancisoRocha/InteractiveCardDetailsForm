//* SELECTORES CARD
const cardNumber = document.querySelector(".card__number");
const cardName = document.querySelector(".card__name");

//* Errores
const errorName = document.querySelector(".msj__error--name");
const errorNumber = document.querySelector(".msj__error--number");
const errorMonthYear = document.querySelector(".msj__error--dates");
const errorCVC = document.querySelector(".msj__error--cvc");

//* SELECTORES FORM
const form = document.querySelector(".container__form--card")
const inputCardHolder = document.querySelector("#nombre");
const inputCardNumber = document.querySelector("#cardNumber");
const inputMonth = document.querySelector("#expire__month");
const inputYear = document.querySelector("#expire__year");
const inputCVC = document.querySelector("#cvc__input");

//* MENSAJE DE CONFIRMACION
const message = document.querySelector(".message");

//* BOTON FORM Y DE CONTINUE
const buttonConfirm = document.querySelector(".btn__form");
const buttonMessage = document.querySelector(".btn__message");


inputCardHolder.addEventListener("input", (e) => {

    const inputNames = e.target.value.trim();

    if( inputNames === "" ){
        errorName.style.display = "block";
        cardName.textContent = "Jane Appleseed";
        inputCardHolder.classList.add("error");
        return;
    }

    //Validar que solo tenga letras
    const hasLetters = /^[a-zA-Z\s]+$/;

    if( !hasLetters.test(inputNames) ){
        errorName.style.display = "block";
        inputCardHolder.classList.add("error");
        return;
    }
    
    //Si todo esta bien
    errorName.style.display = "none";
    inputCardHolder.classList.remove("error");
    cardName.textContent = inputNames;

})

inputCardNumber.addEventListener("input", (e) => {

    let valueNumber = e.target.value.trim();

    // Verificar si tiene algo que NO sea número o espacio
    const hasLetters = /[^\d\s]/.test(valueNumber);

    if( hasLetters ){
    // Mostrar error, NO actualizar la tarjeta
        errorNumber.style.display = "block";
        inputCardNumber.classList.add("error")
        return;
    }

    // Si es válido, ocultar error
    errorNumber.style.display = "none";
    inputCardNumber.classList.remove("error")

    // Quitar espacios, limitar a 16 y formatear
    valueNumber = valueNumber.replace(/\s/g, '');
    valueNumber = valueNumber.slice(0, 16);
    valueNumber = valueNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    e.target.value = valueNumber;

    // Actualizar los spans de la tarjeta
    const number = valueNumber.split(' ');
    document.querySelector("#number-1").textContent = number[0] || '0000';
    document.querySelector("#number-2").textContent = number[1] || '0000';
    document.querySelector("#number-3").textContent = number[2] || '0000';
    document.querySelector("#number-4").textContent = number[3] || '0000';

} )

inputMonth.addEventListener("input", (e) => {

    let valueMonth = e.target.value.trim();

    // Verificar que no este vacio el campo
    if( valueMonth === "" ){
        errorMonthYear.style.display = "block";
        inputMonth.classList.add("error");
        document.querySelector("#month").textContent = "00";
        return;
    }

    //Validar que solo sean numeros
    if(/\D/.test(valueMonth)){
        errorMonthYear.style.display = "block";
        inputMonth.classList.add("error");
        return;
    }

    //Limitar Month a 12
    valueMonth = valueMonth.slice(0, 2)

    // Validar que sea un mes válido (01 - 12)
    const numberMonth = parseInt(valueMonth);
    if( numberMonth < 1 || numberMonth > 12 ){
        errorMonthYear.style.display = "block";
        inputMonth.classList.add("error");
        return;
    }

    //Si es valido, ocultar error
    errorMonthYear.style.display = "none";
    inputMonth.classList.remove("error")

    // Actualizar el input formateado
    e.target.value = valueMonth;

    // Actualizar los spans de DATE
    document.querySelector("#month").textContent = valueMonth.padStart(2, '0');

})

inputYear.addEventListener("input", (e) => {

    let valueYear = e.target.value.trim();

    // Verificar que no este vacio el campo
    if( valueYear === "" ){
        errorMonthYear.style.display = "block";
        inputYear.classList.add("error");
        document.querySelector("#year").textContent = "00";
        return;
    }

    //Validar que solo sean numeros
    if(/\D/.test(valueYear)){
        errorMonthYear.style.display = "block";
        inputYear.classList.add("error");
        return;
    }

    // Limitar a 2 dígitos (formato YY)
    valueYear = valueYear.slice(0, 2)

    // Validar que sea un año válido (25 en adelante, es decir 2025+)
    const yearNumero = parseInt(valueYear);
    const currentYear = new Date().getFullYear() % 100; // Obtiene 25, 26, 27...

    if( yearNumero < currentYear){
        errorMonthYear.style.display = "block";
        inputYear.classList.add("error");
        return;
    }

    //Si es valido, ocultar error
    errorMonthYear.style.display = "none";
    inputYear.classList.remove("error")

    // Actualizar el input formateado
    e.target.value = valueYear;

    // Actualizar los spans de DATE
    document.querySelector("#year").textContent = valueYear.padStart(2, '0');

})

inputCVC.addEventListener("input", (e) => {

    let cvcValue = e.target.value.trim();

    // Verificar que no este vacio el campo
    if( cvcValue === "" ){
        errorCVC.style.display = "block";
        inputCVC.classList.add("error");
        document.querySelector("#cvc").textContent = "000";
        return;
    }
    
    //Validar que solo sean numeros
    if(/\D/.test(cvcValue)){
        errorCVC.style.display = "block";
        inputCVC.classList.add("error");
        return;
    }

    // Limitar a 3 dígitos (formato 123)
    cvcValue = cvcValue.slice(0, 3)

    //Si es valido, ocultar error
    errorCVC.style.display = "none";
    inputCVC.classList.remove("error")

    // Actualizar el input formateado
    e.target.value = cvcValue;

    // Actualizar el span de CVC
    document.querySelector("#cvc").textContent = cvcValue.padStart(3, '0');

})

buttonConfirm.addEventListener("click", (e) => {
    e.preventDefault()

    errorName.style.display = "none";
    inputCardHolder.classList.remove("error");
    
    errorNumber.style.display = "none";
    inputCardNumber.classList.remove("error");

    errorMonthYear.style.display = "none";
    inputMonth.classList.remove("error");

    errorMonthYear.style.display = "none";
    inputYear.classList.remove("error");

    errorCVC.style.display = "none";
    inputCVC.classList.remove("error");

    //Obtener los valores
    const name = inputCardHolder.value.trim();
    const number = inputCardNumber.value.replace(/\s/g, '');
    const months = inputMonth.value.trim();
    const years = inputYear.value.trim();
    const CVC = inputCVC.value.trim();

    let erros = false;

    // Validar nombre
    if( name === "" || !/^[a-zA-Z\s]+$/.test(name)){
        errorName.style.display = "block";
        inputCardHolder.classList.add("error");
        erros = true;
    }

    // Validar numero
    if( number === "" || !/^\d{16}$/.test(number)){
        errorNumber.style.display = "block";
        inputCardNumber.classList.add("error");
        erros = true;
    }

    //Validar MES
    const mesNum = parseInt(months);
    if( months === "" || mesNum < 1 || mesNum > 12 ){
        errorMonthYear.style.display = "block";
        inputMonth.classList.add("error");
        erros = true;
    }
    
    //Validar AÑO
    const yearNum = parseInt(years);
    const currentYear = new Date().getFullYear() % 100;
    if( years === "" || yearNum < currentYear ){
        errorMonthYear.style.display = "block";
        inputYear.classList.add("error");
        erros = true;
    }

    //Validar CVV
    if( CVC === "" || !/^\d{3}$/.test(CVC) ){
        errorCVC.style.display = "block";
        inputCVC.classList.add("error");
        erros = true;
    }

    // Si no hay errores, mostrar mensaje de éxito
    if(!erros){
        form.classList.add("hidden");
        message.classList.remove("hidden");
    }

})

//BOTON DE COTINUE
buttonMessage.addEventListener("click", (e) => {
    e.preventDefault();

    // Limpiar inputs
    inputCardHolder.value = "";
    inputCardNumber.value = "";
    inputMonth.value = "";
    inputYear.value = "";
    inputCVC.value = "";

    // Restaurar valores de la tarjeta
    document.getElementById('number-1').textContent = "0000";
    document.getElementById('number-2').textContent = "0000";
    document.getElementById('number-3').textContent = "0000";
    document.getElementById('number-4').textContent = "0000";
    document.querySelector("#month").textContent = "00";
    document.querySelector("#year").textContent = "00";
    document.querySelector("#cvc").textContent = "000";
    cardName.textContent = "Jane Appleseed";

    // Mostrar formulario, ocultar éxito
    form.classList.remove("hidden");
    message.classList.add("hidden");

})
