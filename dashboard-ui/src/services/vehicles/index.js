import { handleResponse } from "../utils/responseHandler";

export function getVehicles(queryString = "") {
  return fetch(`http://localhost:3002/cars/${queryString}`, {
    method: "GET"
  }).then(handleResponse);
}
