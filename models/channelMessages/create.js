const validateChannelName = (uName) => typeof number;

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    console.log(params);
    const { fromId, channelId, message } = params;

    // console.log(params);
    // console.log(fromId, channelId, message);

    // if (!validateChannelName(fromId)) {
    //   return Promise.reject(
    //     new Error("fromId must be provided, and be at least two characters")
    //   );
    // }

    return knex("channel_messages")
      .insert({
        from: fromId,
        to: channelId,
        message,
      })
      .then(() => {
        console.log("working");
        return knex("channel_messages")
          .where({ fromId })
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
      });
  };
};
