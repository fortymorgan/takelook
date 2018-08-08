module.exports = (routes) => {
  const [_, resource, value] = location.pathname.split('/');

  const currentRoute = routes.find(route => route.path === resource);

  currentRoute.component(value);
};
