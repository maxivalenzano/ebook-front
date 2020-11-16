import axios from "axios";

export default axios.create({
  baseURL: "https://backend-ebook1996.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});