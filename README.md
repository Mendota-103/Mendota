# Mendota - AI Chatbot

Mendota is an advanced AI chatbot trained on over 50,000+ German sentences, designed to provide high-quality conversational responses. Built using **PyTorch**, Mendota leverages modern neural network architectures to simulate human-like interactions, making it an ideal tool for educational purposes, personal assistants, and general conversational applications. Mendota’s goal is to engage users in natural dialogue while continuously learning from interactions to improve its performance.

![Mendota Logo](images/chat.png)


## Usage

To interact with **Mendota**, you can use the trained model through a web interface or directly via Python code. Below are the instructions for both approaches.

### 1. Starting the Mendota-103:

After running the Flask server, you can interact with **Mendota** by sending GET requests to the following endpoint:
```bash
python main.py
```
Once the bot is running, you can make requests to interact with Mendota through the API or a simple command-line interface.
### Example API Request:
```bash
curl "http://localhost:3364/ask?question=Wie%20geht%20es%20dir?"
```
### Example Output:
```json
{
  "response": "Mir geht es gut, danke."
}
```


