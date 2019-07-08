const axios = require('axios');


class Relay {
  constructor(ip, password, channel) {
    this.ip = ip;
    this.password = password;
    this.channel = channel;
  }

  get url() {
    return `http://${this.ip}/${this.password}/`
  }

  async sendCommand(cmd) {
    let params = `?cmd=${this.channel}:${cmd}`;
    return await this.makeRequest(params);
  }

  async getState() {
    let params = `?pt=${this.channel}&cmd=get`;
    return await this.makeRequest(params);
  }

  async isPowerOn() {
    const response = this.getState();
    switch (response.data) {
      case 'ON':
        return true;
      case 'OFF':
        return false;
      default:
        console.error(`Unexpected state: ${response.data}`)
    }
  }

  async makeRequest(params) {
    const url = `${this.url}?${params}`;
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Relay;
