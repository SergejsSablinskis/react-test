import logo from './assets/image/logo.svg';
import appStyles from './assets/style/App.module.scss';
import headerStyles from './assets/style/Header.module.scss';
import VehicleRouteForm from './features/VehicleRoute/VehicleRouteForm'

/*
 DISCLAIMER
  There was around 20h on this work
*/
function App() {
  return (
    <div className={appStyles.contentWrapper}>
      <header>
        <img src={logo} className={headerStyles.appLogo} alt="logo" />
      </header>
      <div  className={appStyles.container}>
        <VehicleRouteForm/>
      </div>
    </div>
  );
}

export default App;
