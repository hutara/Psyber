//session recording

// to record full session, audio and video use this
recordSession()

//to stop session recording
stopSession()

// if you want to schedule to record for let's say 10 seconds
setTimeout(stopSession, 10000) // 10 * 1000 in ms

// by default the recorded audio stream is mixed system audio + mic in
// videos are saved in .mp4 format