const timer = {
  start() {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const { hours, mins, secs } = getTimeComponents(deltaTime);

      console.log(`${hours}:${mins}:${secs}`);
    }, 1000);
  },
};

timer.start();

function updateClockface({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}
