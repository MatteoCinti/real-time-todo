const routes = {
  BACKEND_URL:
    process.env.NETWORK_ENV === 'docker-compose'
      ? 'http://api:4000'
      : 'http://localhost:4000'
};

export default routes;
