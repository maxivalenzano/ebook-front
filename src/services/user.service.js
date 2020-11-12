import http from "../http-common";
import authHeader from './authHeader'; //importo el token

class UserService {
  getPublicContent() {
    return http.get('/test/all');
  }

  getUserBoard() {
    return http.get('/test/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return http.get('/test/mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return http.get('/test/admin', { headers: authHeader() });
  }
  getListEBooks(user){
     return http.get('/test/list', { headers: authHeader() }, {
      id: user.id,
      email: user.email,
      password: user.password
    });
  }
}

export default new UserService();
