import Select from 'react-select'
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux'
import { setVehicleNumber, setPeriodFrom, setPeriodTo, setVehicles } from '../../store/VehicleRouteStore'
import "react-datepicker/dist/react-datepicker.css";
import { IStore } from "../../store/BaseStore"
import vehicleRouteFormStyles from './VehicleRouteForm.module.scss';
import GenerateButton from "../../components/GenerateButton/GenerateButton"
import * as ApiService from "../../services/ApiService"
import { useEffect } from 'react';
import Map from "../../components/Map/Map"

    function VehicleRouteForm() {

        const dispatch = useDispatch();
        const periodFrom = useSelector( (state: IStore) => state.vehicleRoute.periodFrom);
        const periodTo = useSelector( (state: IStore) => state.vehicleRoute.periodTo);
        const vehicles = useSelector( (state: IStore) => state.vehicleRoute.vehicles);
        const routes = useSelector( (state: IStore) => state.vehicleRoute.routes);
        const errors = useSelector( (state: IStore) => state.vehicleRoute.errors);

        useEffect(() => {
            ApiService.getVehicles().then((response) => {
                dispatch(setVehicles(response.data.units.map((item: {number: string, unit_id: string}) => ({
                    label: item.number,
                    value: item.unit_id,
                  }))));
            });
        // eslint-disable-next-line
        }, []);

        const onPeriodFromChanged = (data: Date) => {
            dispatch(setPeriodFrom(data.toISOString()));  
        };

        const onPeriodToChanged = (data: Date) => {
            dispatch(setPeriodTo(data.toISOString()));  
        };

        const onVehicleNumberChanged = (data: any) => {
            dispatch(setVehicleNumber(data));  
        };

        const multipleClasses = (classes: string[]): string => {
            return classes.join(" ");
        };

        const addHasErrorClass = (classes: string, fieldName: string): string => {
            if (errors[fieldName]) {
                classes += " " + vehicleRouteFormStyles.hasError;
            }
            return classes;
        };
        
        return (
            <div className={vehicleRouteFormStyles.contentWrap}>
                <span className={vehicleRouteFormStyles.title}>
                    Route report
                </span>
                <div className={vehicleRouteFormStyles.formWrapper}>
                    <div className={vehicleRouteFormStyles.firstFormBlock}>
                        <div className={addHasErrorClass(multipleClasses([vehicleRouteFormStyles.required, vehicleRouteFormStyles.label]), "vehicleNumber")}>
                            Vehicle number
                        </div>
                        <div className={vehicleRouteFormStyles.label}>
                            Period
                        </div>
                    </div>
                    <div className={vehicleRouteFormStyles.secondFormBlock}>
                        <Select options={vehicles} onChange={onVehicleNumberChanged}/>
                        <div className={vehicleRouteFormStyles.dateWrapper}>
                            <div className={multipleClasses([vehicleRouteFormStyles.label, vehicleRouteFormStyles.control])}>
                                From
                            </div>
                            <DatePicker 
                                maxDate={new Date(periodTo)}
                                dateFormat="dd.MM.yyyy" 
                                selected={new Date(periodFrom)} 
                                onChange={onPeriodFromChanged}
                                className={vehicleRouteFormStyles.marginRight14}
                            />
                        </div>

                        <div className={vehicleRouteFormStyles.dateWrapper}>
                            <div className={multipleClasses([vehicleRouteFormStyles.label, vehicleRouteFormStyles.control])}>
                                To
                            </div>
                            <DatePicker  
                                minDate={new Date(periodFrom)}
                                dateFormat="dd.MM.yyyy" 
                                selected={new Date(periodTo)} 
                                onChange={onPeriodToChanged}
                            />
                        </div>                    
                        
                    </div>
                </div>
                {
                    routes.routes?
                        <div className={vehicleRouteFormStyles.wrapper}>
                            <Map/>
                        </div> : null
                }
                
                
                <div className={vehicleRouteFormStyles.footer}>
                    <div className={vehicleRouteFormStyles.errorsContainer}>
                        {   Object.keys(errors).map((key: string) => {
                                return errors[key].map((error:  string, index: number) => {
                                    return <span key={key + index}>{error}</span>
                                });
                            })
                        }
                    </div>

                    <GenerateButton/>
                </div>                
                
            </div>
        );
    }
  
    export default VehicleRouteForm;


    