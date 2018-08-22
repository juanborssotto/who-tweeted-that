class TwitterUser {
  constructor(id, username, screenName, imageUrl) {
    this.id = id;
    this.username = username;
    this.screenName = screenName;
    this.imageUrl = imageUrl;
  }
  
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getScreenName() {
    return this.screenName;
  }

  setScreenName(screenName) {
    this.screenName = screenName;
  }
  
  getImageUrl() {
    return this.imageUrl;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }
}

module.exports = TwitterUser;