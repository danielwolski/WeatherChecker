import axios from "axios";

const searchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID sVjn3ydepUr1ZCBTNStRH6W6_SbpHyVarMAPjYVChyk"
    },
    params: {
      query: term
    }
  })

  return response.data.results
}
export default searchImages