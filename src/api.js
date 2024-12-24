import axios from "axios";

const searchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID Y2d1-8vnhRWQ2E072QyW-9S0Ba5r-i5TaAEnWP6X98A"
    },
    params: {
      query: term
    }
  })

  return response.data.results
}
export default searchImages