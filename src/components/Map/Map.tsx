import { Map as GoogleMap, Polyline, GoogleApiWrapper, IGoogleApiOptions, Marker} from 'google-maps-react';
import { ISelectedRoute, setSelectedRoute } from '../../store/VehicleRouteStore'
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../store/BaseStore';
import pin from '../../assets/image/pin.png'
import mapStyles from './Map.module.scss';
import { Fragment } from 'react';

function Map(props) {

  const routes = useSelector( (state: IStore) => state.vehicleRoute.routes);
  const selectedRoute: ISelectedRoute = useSelector( (state: IStore) => state.vehicleRoute.selectedRoute);
  const dispatch = useDispatch();

  const mapComponentStyles = {
    width: '100%',
    height: '200px'
  };

  const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '200px'
  }

  const onRouteSelected = (route) => {
    dispatch(setSelectedRoute({
      avgSpeed: route.avg_speed,
      distance: route.distance,
      maxSpeed: route.max_speed,
      isSet: true
    } as ISelectedRoute));  
  }

  const routeColorDiffStep: number = 11650;

  let routeColor: number = 3780658;

  // due to low time to finish some interfaces were ignored
  let filteredRoutes: any = [];
  let filteredStops: any = [];
  if (routes.routes) {
    routes.routes.forEach((route) => {
      let currentRoute =  Object.assign({}, route);
      if (route.type === "route" && route.polyline) {
        currentRoute.decodedPath = props.google.maps.geometry.encoding.decodePath(route.polyline);
        currentRoute.decodedPolylines = currentRoute.decodedPath.map(p => {return {lat:p.lat() , lng:p.lng()}});
        filteredRoutes.push(currentRoute);
      } else {
        filteredStops.push(currentRoute);
      }
    }); 
  }


  return (
    <Fragment>
      <GoogleMap google={props.google}
           zoom={7}
           initialCenter={{
               lat: 56.744260,
               lng: 24.432547
           }}
           style={mapComponentStyles}
           containerStyle={containerStyle}>
             {
                filteredRoutes.map((route, index) => {
                  routeColor += routeColorDiffStep;                  
                  return  [
                            <Polyline
                              key={index}
                              path={route.decodedPolylines}
                              strokeColor={"#" + routeColor.toString(16)}
                              strokeOpacity={1}
                              strokeWeight={3} 
                              onClick={() => { onRouteSelected(route) } }/>,
                            <Marker
                              key={"start_" + index}
                              position={{lat: route.start.lat, lng: route.start.lng}}
                              icon={{
                                url: pin
                              }} 
                              onClick={() => { onRouteSelected(route) } }/>,
                            <Marker
                              key={"end_" + index}
                              position={{lat: route.end.lat, lng: route.end.lng}}
                              icon={{
                                url: pin
                              }} 
                              onClick={() => { onRouteSelected(route) } }/>
                          ];
               })
             }
      </GoogleMap>
      {
        selectedRoute.isSet?
          <div className={mapStyles.footer}>
            <div className={mapStyles.valueWrapper}>
              <div className={mapStyles.value}>{selectedRoute.distance}</div> 
              <div className={mapStyles.label}>Km driven</div>         
            </div>
            <div className={mapStyles.valueWrapper}>
              <div className={mapStyles.value}>{selectedRoute.avgSpeed}</div> 
              <div className={mapStyles.label}>Avg. Speed</div>         
            </div>
            <div className={mapStyles.valueWrapper}>
              <div className={mapStyles.value}>{selectedRoute.maxSpeed}</div> 
              <div className={mapStyles.label}>Max. speed</div>         
            </div>
          </div> : null
      }   
    </Fragment>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  libraries: ['geometry', 'places']
} as IGoogleApiOptions)(Map)
