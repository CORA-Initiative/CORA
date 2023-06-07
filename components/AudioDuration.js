const ffprobePath = require('ffprobe-static').path;
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const execPromise = util.promisify(ffmpeg.ffprobe);

export const getAudioDuration = async (filePath) => {
  try {
    const ffprobeData = await execPromise(filePath, { path: ffprobePath });
    const duration = ffprobeData.format.duration;
    return parseFloat(duration);
  } catch (error) {
    console.error(error);
    return null;
  }
};
