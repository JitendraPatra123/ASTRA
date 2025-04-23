const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const voiceBtn = document.getElementById('voice-btn');

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.textContent = text;
  chatOutput.appendChild(msg);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = synth.getVoices().find(voice => voice.name.includes("Female") || voice.name.includes("Google"));
  synth.speak(utterance);
}

function astraReply(input) {
  let response = "I'm Astra, your assistant.";
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("hello")) response = "Hi there! How can I help?";
  else if (lowerInput.includes("your name")) response = "I'm Astra, your AI assistant.";
  else if (lowerInput.includes("time")) response = `It's currently ${new Date().toLocaleTimeString()}.`;

  addMessage(response, 'astra');
  speak(response);
}

userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && userInput.value.trim()) {
    const input = userInput.value.trim();
    addMessage(input, 'user');
    userInput.value = '';
    setTimeout(() => astraReply(input), 500);
  }
});

// Voice Input
voiceBtn.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    const input = transcript;
    addMessage(input, 'user');
    setTimeout(() => astraReply(input), 500);
  };

  recognition.onerror = function(event) {
    alert('Voice input error: ' + event.error);
  };

  recognition.start();
});
