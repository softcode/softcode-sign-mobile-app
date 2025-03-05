import Config from './react-native-config';

console.log('API URL:', Config.API_URL);

fetch(`${Config.API_URL}/endpoint`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
