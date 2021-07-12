import buttonStyles from './Button.module.scss';
import { setRoutes } from '../../store/VehicleRouteStore'
import { useDispatch, useStore } from 'react-redux'
import * as ApiService from "../../services/ApiService"
import { setErrors } from '../../store/VehicleRouteStore'
import { VehicleNumberRequired } from '../../constants/validation/messages';

function GenerateButton() {

  const store = useStore();
  const dispatch = useDispatch();

  let onClicked = () => {
    const currentState = store.getState().vehicleRoute;

    if (!currentState.vehicleNumber || !currentState.vehicleNumber.value) {
      dispatch(setErrors({
        vehicleNumber: [VehicleNumberRequired]
      }));
      return;
    } 
    else {
      dispatch(setErrors({
      }));
    }

    let params = {
      from: currentState.periodFrom.split(".")[0] + "Z",
      till: currentState.periodTo.split(".")[0] + "Z",
      unit_id: currentState.vehicleNumber.value,
      include: "polyline"
    };

    ApiService.getRoute(params).then((response) => {
      dispatch(setRoutes(response.data.units[0]));
    });
  };

  return (
    <button className={buttonStyles.generate} type="button">
      <span onClick={onClicked}>
        Generate
      </span>
    </button>
  );
}

export default GenerateButton;
