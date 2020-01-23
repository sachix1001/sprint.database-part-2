module.exports = (knex, Channel) => {
  return () => {
    return knex("channels")
      .select()
      .then((users) => {
        const result = [];
        users.map((user) => result.push(new Channel(user)));
        return result;
      });
  };
};
