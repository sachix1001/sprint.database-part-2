module.exports = (knex, ChannelMessage) => {
  return () => {
    return knex("channel_messages")
      .select()
      .then((users) => {
        const result = [];
        console.log(users);
        users.map((user) => result.push(new ChannelMessage(user)));
        console.log(result);
        return result;
      });
  };
};
