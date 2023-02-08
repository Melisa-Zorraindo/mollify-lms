import {
	TTS_DEFAULT_LANG,
	TTS_DEFAULT_PITCH,
	TTS_DEFAULT_RATE,
	TTS_DEFAULT_VOLUME
} from './constants';

export default class MollifyTTS {
  head = 0;

  state = {
    speaking: false,
    paused: false,
    pending: false
  }

	constructor(
		public text: string,
		private _voice?: SpeechSynthesisVoice,
		public volume = TTS_DEFAULT_VOLUME,
		public rate = TTS_DEFAULT_RATE,
		public pitch = TTS_DEFAULT_PITCH,
		public lang = TTS_DEFAULT_LANG
	) {
		this.synth = speechSynthesis;
	}

  public async utter(utterance: SpeechSynthesisUtterance, index: number) {
    await new Promise((resolve, reject) => {
      utterance.onend = resolve;
      utterance.onerror = reject;
      this.synth.speak(utterance);
      this.head = index;
    });
  }

	public async speak(from = 0) {    
    this.state.speaking = true;
    this.state.pending = true;
    this.state.paused = false;
		for await (const [index, utterance] of this.utterances.splice(from).entries()) {
      console.log('Uttering', index);
      try {
        await this.utter(utterance, index); 
      } catch (error) {
        console.warn(error);
      }
      console.log('Finished uttering', index);
		}
    this.state.pending = false;
    this.state.speaking = false;
	}

  public async cancel() {
    this.synth.cancel();
    this.state.speaking = false;
    this.state.paused = false;
  }

  public async pause() {
    this.synth.pause();
    this.state.paused = true;
  }

  public async resume() {
    this.synth.resume();
    this.state.paused = false;
    this.state.speaking = true;
  }

	private synth: SpeechSynthesis;

	public get voice() {
		if (this._voice) {
			return this._voice;
		} else {
			const google = this.voices.supported.filter((voice) => voice.voiceURI.includes('Google'));
			if (!google.length) {
				return this.voices.supported[0];
			} else {
				return google[Math.floor(Math.random() * google.length)];
			}
		}
	}

	public get voices() {
		const all = speechSynthesis.getVoices();
		const supported = all.filter((voice) => {
			return voice.lang.split('-').some((fragment) => this.lang.includes(fragment));
		});
		const unsupported = all.filter((voice) => {
			return !supported.includes(voice);
		});

		return {
			supported,
			unsupported
		};
	}

	public get utterances() {
		return MollifyTTS.splitter(this.text).map((text) => {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.voice = this.voice;
			utterance.volume = this.volume;
			utterance.rate = this.rate;
			utterance.pitch = this.pitch;
			utterance.lang = this.lang;
			return utterance;
		});
	}

	static heuristics = {
    humanTitleHandler(text: string) {
      // Replace dr with Doctor
      text = text.replace(/dr\./gmi, 'Doctor');
      // Replace mr with Mister
      text = text.replace(/mr\./gmi, 'Mister');
      // Replace ms with Miss
      text = text.replace(/ms\./gmi, 'Miss');
      // Replace mrs with Missus
      text = text.replace(/mrs\./gmi, 'Missus');
      // Replace prof with Professor
      text = text.replace(/prof\./gmi, 'Professor');
      return text;
    },
    humanInitialHandler(text: string) {
      return text.replace(/([\w]+)\.\s/gmi, '$1 ');
    },
		replaceFileNamePeriods(text: string) {
			return text.replace(/\b(\w+)\.(\w+)\b/g, '$1 dot $2');
		},
		replaceSlashes(text: string) {
			return text.replace(/\//g, ' slash ');
		},
		insertSpacesInAcronym(text: string) {
			return text.replace(/([A-Z][a-z]*)/g, '$1 ').trim();
		},
		capitalizeAAS(text: string) {
			return text.replace(/([A-Z]+aa[sS])/g, (match) => {
				return match.slice(0, -3) + 'AAS';
			});
		},
		replaceUnderscores(text: string) {
			return text.replace(/_/g, ' underscore ');
		},
		isolatePluralAcronyms(text: string) {
			return text.replace(/([A-Z]+)s\b/g, '$1');
		},
    replaceEg(text: string) {
      return text.replace(/(e\.g\.|eg\.)/g, 'for example');
    }
	};

	static splitter(text: string) {
		let output = new Array<string>();

		// Split by new line
		output = text.split(/\r?\n/);

		// Apply heuristics
		output = output.map((line) => {
      line = this.heuristics.humanTitleHandler(line);
      line = this.heuristics.replaceEg(line);
			line = this.heuristics.replaceFileNamePeriods(line);
			line = this.heuristics.replaceUnderscores(line);
			line = this.heuristics.replaceSlashes(line);
			line = this.heuristics.capitalizeAAS(line);
			line = this.heuristics.isolatePluralAcronyms(line);
			line = this.heuristics.insertSpacesInAcronym(line);
			return line;
		});

		// Split by sentence
		output = output
			.map((phrase) => {
				return phrase.split(/(?<=[.?!])\s/);
			})
			.flatMap((phrase) => phrase);

		// Filter out empty strings
		output = output.filter(Boolean);

		return output;
	}
}
