const validateChannelName = (uName) => typeof number;

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    // console.log(params);

    const { fromId, channelId, message, sentAt } = params;

    let username;
    async function getUser() {
      username = await knex("users")
        .where({
          id: fromId,
        })
        .select("username");
    }

    getUser();

    let channelname;
    async function getChannel() {
      channelname = await knex("channels")
        .where({
          id: channelId,
        })
        .select("channels");
    }
    getChannel();
    // console.log("this", username);
    // console.log(params);
    // console.log(fromId, channelId, message);

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
      })
      .then((messages) => {
        console.log(messages);

        console.log(messages);
        return [new ChannelMessage(messages[0])];
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
