import http from "../http-common";

class EbookDataService {
  getAll(params) {
    return http.get("/ebooks", { params });
  }

  get(id) {
    return http.get(`/ebooks/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/ebooks", data);
  }

  update(id, data) {
    return http.put(`/ebooks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/ebooks/${id}`);
  }

  deleteAll() {
    return http.delete(`/ebooks`);
  }
}

export default new EbookDataService();