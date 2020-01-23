module.exports = (knex, User) => {
  return () => {
    return knex("users")
      .select()
      .then((users) => {
        const result = [];
        users.map((user) => result.push(new User(user)));
        return result;
      });
  };
};
