const apiConfigs = {
  baseUri: process.env.REACT_APP_MAPON_API_BASE_URI,
  maponKey: process.env.REACT_APP_MAPON_API_KEY
};

const addQueryParams = (uri: string, params: any): string => {

  let queryParams: string[] = [];

  Object.keys(params).forEach((key: string) => {
    queryParams.push(`${key}=${params[key]}`);
  });

  return uri + queryParams.join("&");
};

 const errorCatcher = (response: Promise<any>): Promise<any> => {
  // there might be better notification in future, with some kind of popup or at least text appearing somewhere
  return response.then((result) => {
    return  result && !result.error? result : response.then(Promise.reject.bind(Promise));
  });
};

export const getVehicles = () => {
  return errorCatcher(fetch(
    `${apiConfigs.baseUri}/unit/list.json?key=${apiConfigs.maponKey}`)
    .then(response => response.json()).catch((error) => console.log(error)));
};


export const getRoute = (params: any) => {
  return errorCatcher(fetch(
    addQueryParams(`${apiConfigs.baseUri}/route/list.json?key=${apiConfigs.maponKey}&`, params))
    .then(response => response.json()).catch((error) => console.log(error)));
};