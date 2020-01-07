import { handleResponse } from "../utils/responseHandler";

const dashboardServiceURI =
  process.env.DASHBOARD_SERVICE || "http://localhost:8002";

export function getVehicles(queryString = "") {
  return fetch(`${dashboardServiceURI}/cars/${queryString}`, {
    method: "GET"
  }).then(handleResponse);
}
