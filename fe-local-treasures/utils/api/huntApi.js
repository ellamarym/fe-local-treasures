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
