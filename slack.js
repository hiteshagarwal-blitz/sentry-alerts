// Modules
const fetch = require('node-fetch');
const { slackMsgFormatter } = require('sarthi').common.helpers.slack;

const config = require('../config');

/**
 * posts on behalf of "businessreports" app
 * @param channel
 * @param message
 * @return {*}
 */
exports.module.sendMessage = (channel, message) => {
  return fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    body: JSON.stringify({
      channel,
      text: message,
      token: config.slack.slackAccessToken,
      as_user: false,
    }),
    headers: {
      'Content-Type': "application/json;charset=UTF-8",
      Authorization: `Bearer ${config.slack.slackAccessToken}`,
    }
  });
};

/**
 * Helper function to post messages with attachments with attachment in message body
 * @param {any} message
 */
exports.module.postSlackMessageUploadFiles = (message) => {
  return fetch('https://slack.com/api/files.upload', {
    method: 'post',
    body: message,
    headers: message.getHeaders(),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}

/**
 * Send Alert Message to Slack Channel with Attachment object
 * @param channel
 * @param attachments
 * @return {*}
 */
exports.module.postSlackMessageWithAttachment = (channel, attachments) => {
  return fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    body: JSON.stringify({
      channel,
      attachments: slackMsgFormatter(attachments),
      token: config.slack.slackAccessToken,
      as_user: false,
    }),
    headers: {
      'Content-Type': "application/json;charset=UTF-8",
      Authorization: `Bearer ${config.slack.slackAccessToken}`,
    }
  });
};
