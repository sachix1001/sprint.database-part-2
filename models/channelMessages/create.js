const validateChannelName = (uName) => typeof number;

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    const { fromId, channelId, message, sentAt } = params;

    // if (!validateChannelName(fromId)) {
    //   return Promise.reject(
    //     new Error("fromId must be provided, and be at least two characters")
    //   );
    // }

    return knex("channel_messages")
      .insert({
        from_id: fromId,
        channel_id: channelId,
        sent_at: sentAt,
        message,
      })
      .then(() => {
        return knex("channel_messages")
          .join("users", "users.id", "=", "channel_messages.from_id")
          .join("channels", "channels.id", "=", "channel_messages.channel_id")
          .select(
            "users.username as from",
            "channels.name as to",
            "channel_messages.message",
            "channel_messages.id",
            "channel_messages.sent_at"
          );
        // .where({ "channelMessages.channel_id": channelId });
      })
      .then((messages) => {
        const result = [];

        messages.forEach((message) => result.push(new ChannelMessage(message)));
        return result;
      }) // create a user model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        // if (
        //   err.message.match("duplicate key value") ||
        //   err.message.match("UNIQUE constraint failed")
        // )
        return Promise.reject(new Error("It is wrong, morron"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
