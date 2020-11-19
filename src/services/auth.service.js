import http from "../http-common";

class AuthService {
  login(user) {
    return http
      .post('/auth/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return http.post('/auth/signup', {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  recovery(user) {
    return http.post('/auth/recovery', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
