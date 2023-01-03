import axios from "axios";

const localTreasuresApi = axios.create({
  baseURL: "https://brainy-worm-wear.cyclic.app/api",
});
const countriesAPI = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1/countries",
});

export const fetchHunts = () => {
  return localTreasuresApi.get("/hunts").then(({ data: { hunts } }) => {
    return hunts;
  });
};

export const fetchHuntById = (id) => {
  return localTreasuresApi.get(`/hunts/${id}`).then(({ data: { hunt } }) => {
    return hunt;
  });
};

export const getAllCountries = () => {
  return countriesAPI.get("/flag/images").then((response) => {
    return response.data.data.map((country) => {
      return country.name;
    });
  }).catch((err) => {
      return {error: err.response.data.msg}
   });
};

export const getAllFlagUrls = () => {
  return countriesAPI.get("/flag/images").then((response) => {
    return response.data.data.map((country) => {
      return country.flag;
    });
  }).catch((err) => {
      return {error: err.response.data.msg}
   });
};