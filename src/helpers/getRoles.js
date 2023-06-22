const getRoles = (objectRoles) => {
  const roles = [];

  for (let i = 0; i < objectRoles.length; i += 1) {
    roles.push(objectRoles[i].roleName);
  }

  return roles;
};

module.exports = getRoles;
