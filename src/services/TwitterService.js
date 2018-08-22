class TwitterService {
  constructor(twit, TwitterUser) {
    this.twit             = twit;
    this.TwitterUser      = TwitterUser;
    this.getUsers         = this.getUsers.bind(this);
    this.getUserById      = this.getUserById.bind(this);
    this.getFriendsIds    = this.getFriendsIds.bind(this);
    this.getTweets        = this.getTweets.bind(this);
    this.getRandomFriends = this.getRandomFriends.bind(this);
    this.getRandomTweet   = this.getRandomTweet.bind(this);
  }

  async getUsers(text, count) {
    const searchParams = {
      q    : text,
      count: count || 10
    }
    const response = await this.twit.get('users/search', searchParams);
    const users = response['data'].reduce((users, user) => {
      users.push(
        new this.TwitterUser(
          user.id_str,
          user.name,
          user.screen_name,
          user.profile_image_url.replace('_normal', '')));
      return users;
    }, []);
    return users;
  }

  async getUserById(id) {
    const searchParams = {
      user_id: id
    }
    const response = await this.twit.get('users/show', searchParams);
    const user = 
      new this.TwitterUser(
        response['data'].id_str,
        response['data'].name,
        response['data'].screen_name,
        response['data'].profile_image_url.replace('_normal', ''));
    return user;
  }

  async getFriendsIds(userId, count) {
    const searchParams = {
      user_id: userId,
      stringify_ids: true,
      count
    }
    const response = await this.twit.get('friends/ids', searchParams);
    return response['data']['ids'];
  }

  async getTweets(userId, count) {
    const searchParams = {
      user_id: userId,
      stringify_ids: true,
      count,
      exclude_replies: true,
      include_rts: false
    }
    const response = await this.twit.get('statuses/user_timeline', searchParams);
    const tweets = response['data'].map((tweet) => tweet.text);
    return tweets;
  }

  async getRandomFriends(userId, searchCount, returnCount) {
    const friendsIds = await
      this.getFriendsIds(userId, searchCount);
    let randomFriendsIds = [];
    for (var i = 0; i < returnCount; i++) {
      let randomId = friendsIds[Math.floor(Math.random() * friendsIds.length)];
      randomFriendsIds.push(randomId);
      friendsIds.splice(friendsIds.indexOf(randomId), 1);
    }
    let randomFriends = [];
    for(const id of randomFriendsIds) {
      const user = await this.getUserById(id);
      randomFriends.push(user);
    }
    return randomFriends;
  }

  async getRandomTweet(userId, searchCount) {
    let friendTweets = await 
      this.getTweets(userId, searchCount);
    const randomTweet = friendTweets[Math.floor(Math.random() * friendTweets.length)];
    return randomTweet;
  }
}

module.exports = TwitterService;