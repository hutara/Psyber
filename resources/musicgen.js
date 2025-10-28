// made by Omodaka9375 aka Interlooper

import { AutoTokenizer, MusicgenForConditionalGeneration, BaseStreamer } from './js/transformers.js';

let db;
const dbname = 'gen_sounds';

window.openDB = openDB

function encodeWAV(samples, format = 3, sampleRate = 16e3, numChannels = 1, bitDepth = 32) {
		  var bytesPerSample = bitDepth / 8;
		  var blockAlign = numChannels * bytesPerSample;
		  var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
		  var view = new DataView(buffer);
		  writeString(view, 0, "RIFF");
		  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
		  writeString(view, 8, "WAVE");
		  writeString(view, 12, "fmt ");
		  view.setUint32(16, 16, true);
		  view.setUint16(20, format, true);
		  view.setUint16(22, numChannels, true);
		  view.setUint32(24, sampleRate, true);
		  view.setUint32(28, sampleRate * blockAlign, true);
		  view.setUint16(32, blockAlign, true);
		  view.setUint16(34, bitDepth, true);
		  writeString(view, 36, "data");
		  view.setUint32(40, samples.length * bytesPerSample, true);
		  if (format === 1) {
		    floatTo16BitPCM(view, 44, samples);
		  } else {
		    writeFloat32(view, 44, samples);
		  }
		  return buffer;
}

function writeFloat32(output, offset, input) {
		  for (var i = 0; i < input.length; i++, offset += 4) {
		    output.setFloat32(offset, input[i], true);
		  }
}

function floatTo16BitPCM(output, offset, input) {
		  for (var i = 0; i < input.length; i++, offset += 2) {
		    var s = Math.max(-1, Math.min(1, input[i]));
		    output.setInt16(offset, s < 0 ? s * 32768 : s * 32767, true);
		  }
}

function writeString(view, offset, string) {
		    for (let i = 0; i < string.length; ++i) {
		        view.setUint8(offset + i, string.charCodeAt(i))
		    }
}
//here
class CallbackStreamer extends BaseStreamer {
  constructor(callback_fn) {
    super();
    this.callback_fn = callback_fn;
  }

  put(value) {
    return this.callback_fn(value);
  }

  end() {
    return this.callback_fn();
  }
}

//audio_values.ort_tensor.cpuData
function arrayToBlob(rawdata){
  // turn array into a WAV file
  let wav = encodeWAV(rawdata, 3, 32000, 1, 32); // The MusicGen model outputs at a samplerate of 32000, 1 channel (mono), 32 bit data,
  let wav_blob = new Blob([wav], { type: 'audio/wav' });
  return wav_blob;
}

function playBlob(blob, samplename){
    Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: `Playing '${samplename}'`, className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
    const audio_el = document.createElement('audio');
    audio_el.src = window.URL.createObjectURL(blob);
    audio_el.play()
    audio_el.remove()
}

function openDB(dbname){
    const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;
  
  if (!indexedDB) {
    Toastify({ oldestFirst: true, position: "center", gravity: "bottom", text: 'DB not compatible - musicgen not available', className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();

    console.log("IndexedDB could not be found in this browser.");
    return;
  } else {
  }

  
  const openOrCreateDB  = indexedDB.open("dilber", 1);
  openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));
  
  openOrCreateDB.addEventListener('success', () => {
    db = openOrCreateDB.result;
    window.musicgen.db = db
  });

  openOrCreateDB.addEventListener('upgradeneeded', init => {
    db = init.target.result;
    db.onerror = () => { console.error('Error loading database') }
    const table = db.createObjectStore(dbname, { keyPath: 'id', autoIncrement:true });
    table.createIndex('name', 'name', { unique: false });
    table.createIndex('data', 'data', { unique: false });
  });

}

window.__savetodb = saveArrayToDB
function saveArrayToDB(arrayData, sample, prompt = null) {
  const cleanedSampleName = sample.replaceAll(' ','_')
    let sampleName = cleanedSampleName + '.gen';
    if(prompt === null) { sampleName = cleanedSampleName + '.rec' } 
    
    const newSound = { name: sampleName, data: arrayData, prompt: prompt };
    const transaction = db.transaction([dbname], 'readwrite');
    const objectStore = transaction.objectStore(dbname);

    const query = objectStore.add(newSound);
    query.addEventListener('success', () => {
      console.log('Recorded sample: ' + sampleName)
        Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: `Sample '${sampleName}' ready`, className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
    });
    transaction.addEventListener('complete', () => {
        console.log("Sample saved")
    });
    transaction.addEventListener('error', (e) => {
        Toastify({ oldestFirst: true, position: "center", gravity: "bottom", text: 'Error saving sound to database', className: "error", stopOnFocus: true, style: {background: "red"}, }).showToast();
        console.log('Transaction error: \n' + e)
    });
}

function getAllItems(callback){
  var trans = db.transaction(dbname, IDBTransaction.READ_ONLY);
  var store = trans.objectStore(dbname);
  var items = [];

  trans.oncomplete = function(evt) {  
      callback(items);
  };

  var cursorRequest = store.openCursor();

  cursorRequest.onerror = function(error) {
      console.log(error);
  };

  cursorRequest.onsuccess = function(evt) {                    
      var cursor = evt.target.result;
      if (cursor) {
          items.push(cursor.value);
          cursor.continue();
      }
  };
}

window.__getfromdb = async (sampleName) => {
  return new Promise((resolve, reject) => { // Wrap in a Promise
    let data = null;

    const transaction = db.transaction(dbname);
    const objectStore = transaction.objectStore(dbname);

    transaction.oncomplete = () => {
      resolve(data); // Resolve the promise when the transaction completes successfully
    };

    transaction.onerror = (error) => {
      reject(error);  // Reject the promise if there's an error
    }

    objectStore.openCursor().addEventListener('success', e => {
        const pointer = e.target.result;
        if(pointer) {
            if(pointer.value.name == sampleName){
                data = pointer.value.data;
                return resolve(data); // Resolve the promise with the found data
            } else {
                pointer.continue();
            }
        } else {
          Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: `Sample ${sampleName} not found`, className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
          return resolve(null); // Resolve with null if not found
        }
      })
  });
};

window.__playfromdb = playFromDB
function playFromDB(sampleName){
    const objectStore = db.transaction(dbname).objectStore(dbname);
    objectStore.openCursor().addEventListener('success', e => {
        const pointer = e.target.result;
        if(pointer) {
            if(pointer.value.name === sampleName){
                const bl = arrayToBlob(pointer.value.data);
                playBlob(bl, sampleName)
            } else {
                pointer.continue();
            }
        } else {
          Toastify({ oldestFirst: true, position: "center", gravity: "bottom", text: `Sample ${sampleName} not found`, className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
        }
      });
}

function addToDB(prompt, name, duration = 8, creativity = 0.1){
    let inputs;
    const guidance_scale =  3;
    const temperature = creativity;
    let max_length;
    Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: 'Loading MusicGen ...', className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();

    AutoTokenizer.from_pretrained('Xenova/musicgen-small')
      .then(tokenizerObj => {
        inputs = tokenizerObj(prompt);
        return tokenizerObj;
      })
      .catch(error => {
        console.error("Error loading tokenizer:", error);
      });
    
    MusicgenForConditionalGeneration.from_pretrained('Xenova/musicgen-small', {
        progress_callback: (data) => { if (data.status !== 'progress') return; },
        dtype: {
          text_encoder: 'q8',
          decoder_model_merged: 'q8',
          encodec_decode: 'fp32',
        },
        device: 'wasm',
      }).then(modelObj => {
        Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: 'MusicGen loaded', className: "info", stopOnFocus: false, style: { background: "#40444d" }, }).showToast();
        Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: `Generating '${name}.gen'`, className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
        max_length = Math.min(
            Math.max(Math.floor(duration * 50), 1) + 4,
            modelObj.generation_config.max_length ?? 1500,
        )
        modelObj.generate({
            ...inputs,
            max_length, // duration, as number of tokens. 10 seconds equals to approximatately 1500 tokens
            guidance_scale,
            temperature,
            streamer,
        }).then(audioValuesObj => {
           saveArrayToDB(audioValuesObj.ort_tensor.cpuData, name, prompt);
           return audioValuesObj;
        }).catch(error => {
           console.error("Error generating audio:", error);
        });
        return modelObj;
      })
      .catch(error => {
        console.error("Error loading model:", error);
      });
    // Now you can use 'model' outside of the .then() block (after it resolves)
    const streamer = new CallbackStreamer((value) => {
        const percent = value === undefined ? 1 : value[0].length / max_length;
        //console.log("Generating: " + Math.round(percent) + "%");
    })
}

// Main function that starts the (download and) music generation process
window.musicgen = (prompt, name, duration = 6, creativity = 0.1) => {
    var exists = false;
    getAllItems(function (items) {
      for (var i = 0; i < items.length; i += 1) {
        if(items[i].name == name || items[i].prompt == prompt)  exists = true;
      }
      if(exists){
        var msg = `The sound '${name}.gen' already exists. Try playing it!`;
        Toastify({  oldestFirst: true, position: "center", gravity: "bottom", text: msg, className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
      } else {
        addToDB(prompt, name, duration, creativity)
      }
    })
} 

window.musicgen.list = () => {
  getAllItems(function (items) {
    console.log(`Sample count: ${items.length}`)
    for (var i = 0; i < items.length; i += 1) {
      console.log(`./${items[i].name}`)
    }
    Toastify({ oldestFirst: true, position: "center", gravity: "bottom", text: "Check dev console!", className: "info", stopOnFocus: false, style: {background: "#40444d"}, }).showToast();
  })
}
