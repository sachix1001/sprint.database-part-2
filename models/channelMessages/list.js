module.exports = (knex, ChannelMessage) => {
  return () => {
    return knex("channel_messages")
      .join("users", "users.id", "=", "channel_messages.from_id")
      .join("channels", "channels.id", "=", "channel_messages.channel_id")
      .select(
        "users.username as from",
        "channels.name as to",
        "channel_messages.message",
        "channel_messages.id",
        "channel_messages.sent_at"
      )
      .then((users) => {
        // console.log(users);
        const result = [];
        users.map((user) => result.push(new ChannelMessage(user)));
        // console.log(result);
        return result;
      });
  };
};
