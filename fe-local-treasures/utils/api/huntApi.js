import axios from "axios";

const localTreasuresApi = axios.create({
  baseURL: "https://brainy-worm-wear.cyclic.app/api",
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


export const getAllCapitals = () => {
  return axios.get("https://restcountries.com/v2/all").then((response) => {
    return response.data;
  });
};

export const fetchStatsByUser = (user) => {
  return localTreasuresApi.get(`/users/${user}/stats`).then(({data: {stats}})=> {
    return stats
  })
}
