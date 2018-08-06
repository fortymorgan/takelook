module.exports = (resource, value) => {
  history.pushState(null, null, location.origin + `/${resource}/${value}`);
};
