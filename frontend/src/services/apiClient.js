import axios from "axios";

//production

// export default axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

export default axios.create({
  baseURL: location.hostname==="localhost"?"http://localhost:8080":"/api",
  withCredentials: true,
});
