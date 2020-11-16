import http from "../http-common";
import authHeader from './authHeader'; //importo el token

class UserService {
  getPublicContent() {
    return http.get('/all');
  }

  getUserBoard() {
    return http.get('/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get('/admin', { headers: authHeader() });
  }
  getListEBooks(user){
     return http.get('/list', { headers: authHeader() }, {
      id: user.id,
      email: user.email,
      password: user.password
    });
  }
  postBuy(data) {
    return http.post('/list', { headers: authHeader(), data }, data);
  }
}

export default new UserService();
