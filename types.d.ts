export declare global {
  interface Window {
    SpeechRecognition: typeof webkitSpeechRecognition
    webkitSpeechRecognition: typeof webkitSpeechRecognition
    SpeechGrammarList: typeof webkitSpeechGrammarList
    webkitSpeechGrammarList: typeof webkitSpeechGrammarList
    SpeechRecognitionEvent: typeof webkitSpeechRecognitionEvent
    webkitSpeechRecognitionEvent: typeof webkitSpeechRecognitionEvent
  }
}
