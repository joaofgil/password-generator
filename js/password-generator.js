const options = {
  numbers: true,
  uppercases: true,
  lowercases: true,
  symbols: true,
  similars: true
}

const numbers = '1234567890'
const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
const symbols = '!?#$%&*+-='

const numbersNoSimilar = '2345679'
const upperCasesNoSimilar = 'ACDEFGHJKLMNPRSTUVWXYZ'
const lowerCasesNoSimilar = 'abcdefghijkmnopqrstuvwxyz'
const symbolsNoSimilar = '?#$%&*+-='

let PASSWORD_LENGTH = 20
let NUMBER_OF_PASSWORDS_TO_GENERATE = 1

document.getElementById('password-length').value = PASSWORD_LENGTH;

let charPool = numbers + upperCases + lowerCases + symbols

document.getElementById('numbers').addEventListener('change', updateOptions)
document.getElementById('uppercases').addEventListener('change', updateOptions)
document.getElementById('lowercases').addEventListener('change', updateOptions)
document.getElementById('symbols').addEventListener('change', updateOptions)
document.getElementById('similars').addEventListener('change', updateOptions)
document.getElementById('password-length').addEventListener('change', updatePasswordlength)
document.getElementById('submit-btn').addEventListener('click', generatesRandomPasswords)

function updateOptions() {
  options.numbers = document.getElementById('numbers').checked
  options.uppercases = document.getElementById('uppercases').checked
  options.lowercases = document.getElementById('lowercases').checked
  options.symbols = document.getElementById('symbols').checked
  options.similars = document.getElementById('similars').checked
  updateCharPool()
  updateSubmitButton()
  generatesRandomPasswords()
}

function updatePasswordlength(){
  let inputValue = Number(document.getElementById('password-length').value);
  if(inputValue<5){
    inputValue =5;
    document.getElementById('password-length').value = 5;
  }
  if(inputValue>100){
    inputValue = 100;
    document.getElementById('password-length').value = 100;
  }
  PASSWORD_LENGTH = inputValue;
  generatesRandomPasswords()
}

function generatesRandomPasswords() {
  const randomPasswords = []
  for (let i = 0; i < NUMBER_OF_PASSWORDS_TO_GENERATE; i++) {
    randomPasswords.push(Array(PASSWORD_LENGTH)
      .fill(charPool)
      .map(x => x[Math.floor(Math.random() * x.length)])
      .join('')
    )
  }
  showResults(randomPasswords)
}

function updateCharPool() {
  charPool = ''
  if (options.similars) {
    if (options.numbers) { charPool += numbersNoSimilar }
    if (options.uppercases) { charPool += upperCasesNoSimilar }
    if (options.lowercases) { charPool += lowerCasesNoSimilar }
    if (options.symbols) { charPool += symbolsNoSimilar }
  } else {
    if (options.numbers) { charPool += numbers }
    if (options.uppercases) { charPool += upperCases }
    if (options.lowercases) { charPool += lowerCases }
    if (options.symbols) { charPool += symbols }
  }
}

function updateSubmitButton() {
  document.getElementById('submit-btn').disabled = !(options.numbers || options.uppercases || options.lowercases || options.symbols);
}

function showResults(randomPasswords) {
  const resultContainer = document.querySelector('.center-results')
  resultContainer.innerHTML = ''
  
  randomPasswords.forEach((password, index) => {
    const passwordDiv = document.createElement('div')
    passwordDiv.classList.add('flex-container', 'password-result')
    passwordDiv.innerHTML = `
      <input type="text" id="password-${index}" value="${password}" spellcheck="false">
      <button class="btn copy-btn no-wrap" onclick="copyPassword('password-${index}')">Copy</button>
    `
    resultContainer.appendChild(passwordDiv)
  })
}

function copyPassword(passwordId) {
  const passwordField = document.getElementById(passwordId);
  passwordField.select();
  document.execCommand('Copy');
}
updateOptions();