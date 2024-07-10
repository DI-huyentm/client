import axios from "axios";

export const fetchData  = async (interval, category) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/defects`,
        {
          params: {
            interval: interval,
            category: category,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching defect data:", error);
    }
  };

  export const fetchGeneralInfo  = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/general_info`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching defect data:", error);
    }
  };