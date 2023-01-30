export const fakePayment = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.5) {
        resolve({ ok: true });
      } else {
        reject("Something went wrong!");
      }
    }, 2500);
  });
};
