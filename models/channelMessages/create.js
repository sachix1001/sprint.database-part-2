const validateChannelName = (uName) => typeof number;

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    const from_id = params.fromId;

    if (!validateChannelName(from_id)) {
      return Promise.reject(
        new Error("fromId must be provided, and be at least two characters")
      );
    }

    return (
      knex("channel_messages")
        // .insert({
        //   from_id,
        //   message: params.message,
        //   channel_id: params.channelId,
        // })
        .then(() => {
          console.log(from_id);
          return knex("channel_messages")
            .where({ from_id })
            .select();
        })
        .then((channel) => {
          // console.log(new Channel(channel.pop()));

          return new ChannelMessage(channel.pop());
        }) // create a user model out of the plain database response
        .catch((err) => {
          // sanitize known errors
          // if (
          //   err.message.match("duplicate key value") ||
          //   err.message.match("UNIQUE constraint failed")
          // )
          return Promise.reject(new Error("That channel already exists"));

          // throw unknown errors
          return Promise.reject(err);
        })
    );
  };
};
