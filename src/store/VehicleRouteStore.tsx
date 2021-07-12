import { createSlice } from '@reduxjs/toolkit'

let today = new Date(Date.now());

export interface ISelectedRoute {
  avgSpeed?: number,
  distance?: number,
  maxSpeed?: number,
  isSet: boolean
}

export const vehicleRouteSlice = createSlice({
  name: 'vehicleRoute',
  initialState: {
    vehicleNumber: "",
    periodFrom: new Date((new Date(today).setDate(today.getDate()-31))).toISOString(),
    periodTo: today.toISOString(),
    vehicles: [],
    routes: [],
    selectedRoute: { isSet: false } as ISelectedRoute,
    errors: {}
  },
  reducers: {
    setVehicleNumber: (state, {payload}) => {
      state.vehicleNumber = payload;
    },
    setPeriodFrom: (state, {payload}) => {
      state.periodFrom = payload;
    },
    setPeriodTo: (state, {payload}) => {
      state.periodTo = payload;
    },
    setVehicles: (state, {payload}) => {
      state.vehicles = payload;
    },
    setRoutes: (state, {payload}) => {
      state.routes = payload;
    },
    setSelectedRoute: (state, {payload}) => {
      state.selectedRoute = payload;
    },
    setErrors: (state, {payload}) => {
      state.errors = payload;
    },

  }
})

// Action creators are generated for each case reducer function
export const { setVehicleNumber, setPeriodFrom, setPeriodTo, setVehicles, setRoutes, setSelectedRoute, setErrors } = vehicleRouteSlice.actions

export default vehicleRouteSlice.reducer