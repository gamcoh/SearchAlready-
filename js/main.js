let inputs = document.getElementsByTagName('input');
let focusedElement = document.activeElement;

function main () {
  // if the user is already on an input we don't need to help him
  if (focusedElement.tagName === 'INPUT' && focusedElement.type === 'text' && !focusedElement.hidden) {
    return;
  }

  let input;
  let inputFocusedFound = false;
  
  const currentWebsite = location.origin;
  // check if this website is already saved
  let websites = JSON.parse(localStorage.getItem('search_already_current_website')) || {};
  if (websites[currentWebsite] !== undefined) {
    if (websites[currentWebsite].id !== '') {
      input = document.querySelector('input#' + websites[currentWebsite].id);
    } else {
      input = document.querySelector(`input[name="${websites[currentWebsite].name}"]`);
    }
   
    input.focus();
    document.execCommand('paste');
    console.log(input);
    input.select();
    inputFocusedFound = true;
  }

  for (let i = 0; i < inputs.length; i++) {
    const currentInput = inputs[i];
    if (currentInput.tagName === 'INPUT' && currentInput.type === 'text' && !currentInput.hidden && !inputFocusedFound) {
      currentInput.focus();
      document.execCommand('paste');
      currentInput.select();

      websites[currentWebsite] = {id: currentInput.id, name: currentInput.name};
      localStorage.setItem('search_already_current_website', JSON.stringify(websites));

      break;
    }

    currentInput.addEventListener('click', function () {
      websites[currentWebsite] = {id: currentInput.id, name: currentInput.name};
      localStorage.setItem('search_already_current_website', JSON.stringify(websites));
    })
  }
};

main();
