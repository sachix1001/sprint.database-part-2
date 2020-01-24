module.exports = (knex, ChannelMessage) => {
  return () => {
    return knex("channel_messages")
      .select()
      .then((users) => {
        console.log(users);
        const result = [];
        users.map((user) => result.push(new ChannelMessage(user)));
        console.log(result);
        return result;
      });
  };
};
