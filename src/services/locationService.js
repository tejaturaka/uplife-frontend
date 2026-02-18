import axios from 'axios';

const DATA_URL = 'https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json';

const realMandalData = {
  "Lakhisarai": ["Lakhisarai", "Surajgarha", "Barahiya", "Halsi", "Ramgarh Chowk", "Pipariya"],
  "Patna": ["Patna Sadar", "Phulwari Sharif", "Sampatchak", "Danapur", "Bihta", "Maner", "Barh", "Bakhtiarpur", "Mokama", "Fatwah", "Khagaul"],
  "Gaya": ["Gaya Sadar", "Bodh Gaya", "Dobhi", "Sherghati", "Belaganj", "Wazirganj"],
  "Hyderabad": ["Amberpet", "Asifnagar", "Bahadurpura", "Bandlaguda", "Charminar", "Golconda", "Himayatnagar", "Khairatabad", "Saidabad", "Secunderabad"],
  "Warangal": ["Warangal", "Khila Warangal", "Hanamkonda", "Dharmasagar", "Geesugonda", "Sangem"],
  "Ranchi": ["Ranchi", "Kanke", "Namkum", "Omanjhi", "Bero", "Bundu", "Silli", "Tamar", "Mandar"],
  "Haveri": ["Haveri", "Byadgi", "Hangal", "Hirekerur", "Ranebennur", "Shiggaon", "Savanur"]
};

export const fetchLocations = async () => {
  try {
    const res = await axios.get(DATA_URL);
    return res.data.states || [];
  } catch (error) {
    return [
      { state: "Telangana", districts: ["Hyderabad", "Warangal"] },
      { state: "Bihar", districts: ["Patna", "Lakhisarai", "Gaya"] },
      { state: "Jharkhand", districts: ["Ranchi"] },
      { state: "Karnataka", districts: ["Haveri"] }
    ];
  }
};

export const getMandals = (dist) => {
  if (realMandalData[dist]) return [...realMandalData[dist]].sort();
  return [`${dist} Sadar`, `${dist} Rural`, `${dist} North`, `${dist} South`].sort();
};