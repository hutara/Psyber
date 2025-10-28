# Dilber 
Live audio-visual coding environment in JavaScript for the browser

![interface](/resources/images/demo.png)

https://github.com/user-attachments/assets/d01a258c-34f4-4e3b-8bd5-1b9b1aaee542



## Features
- Audio synthesys via multiple engines ([Monosynth](https://dilber.io/docs/index.html#instruments-monosynth), [Polysynth](https://dilber.io/docs/index.html#instruments-synth), [FM synth](https://dilber.io/docs/index.html#instruments-fm) ...)
- Video synthesys using [Hydra Video Synth](https://hydra.ojack.xyz/), [P5.js](https://p5js.org/) and [Marching.js](https://github.com/charlieroberts/marching)
- Audio and video sequencing (gibber, step sequencing, tydalcycles/strudel)
- Over 40 tutorials and demos on how to use
- Over 3000 tunings and scales, see https://dilber.io/scales.html
- Sample sources supported: `local files, online files, microphone recording, musicgen AI model`
- Sample mangling (see [sampler docs](https://dilber.io/docs/index.html#instruments-sampler))
- Record samples with your mic/audio in using `recordMic(<seconds>)`, defaults to 5 seconds recordings
- Generate samples locally with `musicgen(<prompt>,<shortname>)` for more sample choices
- Create your own synths with oscilators, envelopes, lfos and more...
- Supported sample formats are `wav, aif, mp3, aiff`
- Audio in via command: `FFT.startMic()` - check Audio In tutorial
- Audio effects <i>(BitCrusher, Delay, Filter, Distortion, Flanger, Reverb, RingMod, Vibrato, Tremolo, Wavefolder)</i>
- Video effects <i>(Antialiasing, Bloom, Blur, Brightness, Contrast, Edges, Focus, Godrays, Motion Blur, Hue, Invert)</i>
- Camera control <i>(WASD, arrows)</i>
- MouseX and MouseY tracking
- Works offline!
- Saving and loading your dilber files from computer
- MIDI out for your external or hardware synths
- Share your code with others instantly
- Custom toast messages when there is an error in the code
- Soundfont support (Asprin, Chaos, GeneralUserGS, and JCLive)
- Custom server support, check out [server script](resources/dilber-server.js)
- Custom background via `bg(<url>)` command - check `backgrounds` tutorial in app
- Sequence gifs via `bg.seq([image_array], [duration_array], random=true)`
- Record your audio (system+mic) and video performance via `recordSession()` and `stopSession()`
- Autosave - in case of a crash it stores your code accross sessions. Default interval is set to 30 minutes. It can be turned off or customized.
- Spectator mode - after creating a session in perform mode, a spectator link is copied to your clipboard. Paste it anyhere to invite people to spectate your performance live. 
- [Soon] P2P realtime collaboration with shared editor and chat over secure sockets


## Where to start
 1. Go to [dilber.io](https://dilber.io) and start <i>dilbering</i>!

 2. Or go to [Releases page](https://github.com/Omodaka9375/dilber/releases) and download the latest version
 
 3. Or clone this repository and run it locally in VS Code using [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


## Dilber commands

Dilber uses keyboard shortcuts to control starting and stoping code, music and visuals. Make sure to get to know them first!

```
Windows // Mac commands:

Execute line of code:       CTRL+ENTER // CONTROL+RETURN
Execute block of code:      ALT+ENTER // COMMAND+RETURN
Execute page code:          CTRL+A (then CTRL+ENTER) // COMMAND+A (then COMMAND+RETURN)
Stop all:                   CTRL+. or SHIFT+CTRL+. // CONTROL+. or SHIFT+CTRL+.
   
Save code:                  SHIFT+CTRL+S // SHIFT+CONTROL+S
Load code:                  SHIFT+CTRL+L // SHIFT+CONTROL+L
   
Zoom in:                    SHIFT+CTRL++ // SHIFT+CONTROL++ 
Zoom out:                   SHIFT+CTRL+- // SHIFT+CONTROL++
   
Edit pattern:               ALT or OPTION + click on the pattern (crosshair cursor will show)
   
Toggle code background:     SHIFT+ALT+B // CONTROL+OPTION+B
Toggle code visibility:     CTRL+H // CONTROL+H
Toggle free camera (3D):    SHIFT+CTRL+C // SHIFT+CONTROL+C (📹 icon when camera mode is active)
```

## Visual libraries
     - 3D Raymarching
     - Hydra
     - P5.js

## Use online samples with Sampler instrument
```
- Use a direct link to your sample as a parameter: Sampler('https://somewebsite.come/awesomesample.wav')

- Use any sound from Freesound.org library by ID: 
     Freesound(4048)

- Download samples by query: 
     Freesound('crickets')

- Get random samples:
     Freesound({ 
          query:'drums +90 +bpm', // search for drums, 90, and bpm
          max:5, 			    // max of five seconds in length
          single:false, 		    // files do not have to contain single sounds / notes
          filename:false,         // do not require query terms to be present in filename
          count:5,			    // load five samples...
          maxVoices:1		    // ... but only play one at a time
     })
```

## Use local samples with Sampler
```
 - Clone this repo and put your samples in `samples` folder
 - Open index.html on your local machine (you can use http-server or LiveServer in VS Code)
 - Use it in your code like a normal instrument: Sampler('yoursample.wav')

 or

 - Use local audio model to generate new samples for you e.g. `musicgen('90s drum beat heavy 120 bpm', 'drum2')
 - Use it in your code: Sampler('drum2.gen')

 or

 - Record a sample via microphone in your browser with `recordMic()` command
 - Use it in your code: Sampler('<recording-name>.rec')
```



## Sequence external synths
```
 - Click on `midi out` button in top menu and select MIDI out device 
 - Send a MIDI NoteOn message with a value of 60 to channel 0: channels[0].midinote(60)
 - See MIDI Out tutorial in Dilber for more!
```

## Running custom wss server
- You can find server script here [dilber-server](resources/dilber-server.js) 
- Feel free to clone and setup your own server over SSL


## Recent changes
```
- record your sessions (video and audio)
- background image sequencing
- musicgen-small AI model support for sample generation
- MIDI out support - controll your external synths with Dilber via WebMIDI
- Process audio/mic in for live reactivity
- Sample your audio/mic in
- UI fixes for popups and notifications
- Removed most of redundant code and unnecesary files
- P2P WebSockets now works properly over wss server
- Added audio in via FFT.StartMic() command
- Added MouseY and MouseY parametars for modulating things from 0.0 to 1.0
- Added Load and Save functionality so you can export or load dilber files from your computer
- Improved error catching and logging
- Fully static app, runs locally
- Simple folder structure:
  ./docs
  ./samples    <-- your samples go here
  ./resources  <-- all other files
   index.html  <-- main page
  ... many more
```

## Third-party libraries
 - [Gibber](https://github.com/gibber-cc/gibber) for audio and graphics engine
 - [Tune.js](https://github.com/abbernie/tune) for an extensive list of tunings. Visit https://dilber.io/scales.html
 - [Toastify.js](https://github.com/apvarun/toastify-js) for custom toast messages
 - [Vim.js](https://github.com/yuezk/vim-js) for syntax highlighting 
 - [CodeMirror](https://github.com/codemirror/dev/) for editor component

## Where to find out more
- Open [dilber.io](https://dilber.io) and take a look at examples/tutorial list (instructions are commented)
- Read the full [documentation](https://dilber.io/docs/index.html)

<br>

## Support the project
- [Buy me a coffee](https://buymeacoffee.com/omodaka9375)
- ETH: 0xe60Ce880010af7C449256B5f12521eb98fBDf5AD

## License
MIT
