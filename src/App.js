import logo from './logo.svg';
import './App.css';

const doctorTime = require('./doctorSсheduleData');

function App() {

  function createSсhedule(doctorTime) {

    function timeToMinutes(time) {
      const timeParts = time.split(':');

      return (timeParts[0] * 60) + +timeParts[1];
    };

    function minutesToTime(minutes) {
      let mins = minutes % 60 + '';
      let hours = (minutes - mins) / 60 + '';

      if (hours.length === 1) {
        hours = '0' + hours;
      };

      if (mins.length === 1) {
        mins = '0' + mins;
      };

      return `${hours}:${mins}`;
    };

    const sсhedule = [];
    const initialVisitDuration = 45;
    let visitTime = timeToMinutes(doctorTime.start);

    while (visitTime + initialVisitDuration <= timeToMinutes(doctorTime.end)) {
      let shouldAddInitial = true;
      sсhedule.push(minutesToTime(visitTime));

        for (let s = 0; s < doctorTime.appointments.length; s++) {
          const appointmentStart = timeToMinutes(doctorTime.appointments[s].start);

          const appointmentEnd = timeToMinutes(
            doctorTime.appointments[s].start
          ) + doctorTime.appointments[s].duration;

          if (appointmentStart >= visitTime
            && appointmentStart < visitTime + initialVisitDuration
          ) {
            visitTime = appointmentEnd;
            sсhedule.splice(sсhedule.length - 1, 1);
            shouldAddInitial = false;
          }
        };

        if (shouldAddInitial) {
          visitTime += initialVisitDuration;
        };
    };

    return sсhedule;
  }

  console.log('---The result of the task:', createSсhedule(doctorTime));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Part 2 of the task</h1>
        <h2>The result of the createSсhedule function:</h2>

        <div>
          {createSсhedule(doctorTime).join(' | ')}
        </div>

      </header>
    </div>
  );
}

export default App;
