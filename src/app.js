function getRandomNumber() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 11); // Genera un número entre 0 y 10
        resolve(randomNumber); // Resuelve la promesa con el número aleatorio
      }, 3000); // Espera 3 segundos antes de resolver la promesa
    });
  }

  module.exports = getRandomNumber;