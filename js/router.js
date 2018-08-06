module.exports = (routes) => {
  const [_, resource] = location.pathname.split('/');

  const currentRoute = routes.find(route => route.path === resource);

  currentRoute.component();
};
