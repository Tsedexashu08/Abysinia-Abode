//this function will be used to calculate date of birth from age in edit page.
export function getDateOfBirth(age) {
  const currentDate = new Date();
  const yearOfBirth = currentDate.getFullYear() - age;

  const dobString = `${yearOfBirth}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  return dobString;
}


// Splits the image string by commas and trim any whitespace(cause thats how we store em in our db)
export function splitImagePaths(imageString) {
  return imageString.split(',').map(path => path.trim());
}


export function splitString(str){//function to split comma separated strings.
  const commaIndex = str.indexOf(',');
   return str.slice(0, commaIndex);

}

export function getNames(fullName) {
  // Split the full name into an array
  const namesArray = fullName.trim().split(' ');

  // Retrieve the first name
  const firstName = namesArray[0];

  // Retrieve the last name (the last element of the array)
  const lastName = namesArray[namesArray.length - 1];

  // Retrieve middle names (all elements except the first and last)
  const middleNames = namesArray.slice(1, namesArray.length - 1).join(' ');

  return {
    firstName,
    middleNames,
    lastName
  };
}



