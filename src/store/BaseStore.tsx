import { configureStore } from '@reduxjs/toolkit'
import vehicleRouteReducer from './VehicleRouteStore'

export default configureStore({
  reducer: {
    vehicleRoute: vehicleRouteReducer
  }
})

export interface IStore {
  vehicleRoute: any;
}