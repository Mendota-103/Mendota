const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const newChatButton = document.getElementById('new-chat-btn');
const chatHistory = document.getElementById('chat-history');

// an Array which storaging chats
let chats = {
    1: ["Hallo! Wie kann ich dir beim Deutschlernen helfen?"]
};

let activeChat = 1;

// New chat
newChatButton.addEventListener('click', function() {
    activeChat++;
    chats[activeChat] = ["Hallo! Wie kann ich dir beim Deutschlernen helfen?"];
    updateChatHistory();
    loadChat(activeChat);
});

// Send userinput
sendButton.addEventListener('click', function() {
    const userText = userInput.value.trim();

    if (userText) {
        chats[activeChat].push(userText);

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user-message');
        userMessageDiv.textContent = userText;
        chatBox.appendChild(userMessageDiv);

      
        chatBox.scrollTop = chatBox.scrollHeight;

    
        userInput.value = '';

     
        setTimeout(() => {
            getChatbotResponse(userText, function(botMessage) {
                chats[activeChat].push(botMessage);

                // Bot cevabını ekrana yaz
                const botMessageDiv = document.createElement('div');
                botMessageDiv.classList.add('message', 'bot-message');
                botMessageDiv.textContent = botMessage;
                chatBox.appendChild(botMessageDiv);

                // Chat penceresini aşağı kaydır
                chatBox.scrollTop = chatBox.scrollHeight;
            })
        }, 1000);
    }
});

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Update chat history
function updateChatHistory() {
    chatHistory.innerHTML = '';

    for (let chatId in chats) {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.textContent = `Gespräch ${chatId}`;
        chatItem.addEventListener('click', () => loadChat(chatId));

        
        chatItem.classList.remove('active');
        if (chatId == activeChat) {
            chatItem.classList.add('active');
        } else {
            chatItem.classList.remove('active');
        }

        chatHistory.appendChild(chatItem);
    }
}

// load chat
function loadChat(chatId) {
    activeChat = chatId;
    chatBox.innerHTML = '';
    
    chats[activeChat].forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', message.startsWith('Hallo!') ? 'bot-message' : 'user-message');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
    updateChatHistory();
}

// generate answer
function getChatbotResponse(userText, callback) {
    fetch(`http://127.0.0.1:3364/ask?question=${encodeURIComponent(userText)}`)
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response;
            callback(botResponse);  
        })
        .catch(error => {
            console.error("Hata:", error);
            callback("Üzgünüm! Sunucum şuanda meşgul!");
        });
}

updateChatHistory();
