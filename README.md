# Sola AI : AI Voice assistant for Solana

Sola AI is a personalized AI voice assistant that bridges Solana blockchain technology and AI through hands free user experience. 

![Product](https://github.com/user-attachments/assets/b96d6d69-f30d-4d79-9229-973ffe6561f2)

## Overview
This application provides a seamless interaction between the user, OpenAI, and blockchain data and on-chain interaction using voice and text through a robust architecture. Key features include:

*   **Real-time Communication:** Utilizes WebRTC for seamless voice and text communication between the client and OpenAI, ensuring a robust and responsive user experience.
*   **Modern Frontend:** The client is built with Vite React and styled with Tailwind CSS, providing a responsive and modern user interface.
*   **Scalable Backend:** Employs a microservices architecture to handle blockchain data processing based on user queries. This design allows the client to scale efficiently without being burdened by complex data handling.
*   **Blockchain Data Filtering:** Microservices filter and process blockchain data according to user queries, significantly reducing client-side overhead and improving performance.
*   **Blockchain Interactions:** The application Solana on-chain interactions (like transfer, swap etc..) from the client side. 

> Centralized Server Migration (Previous Version): <br>
The previous version of Sola AI leveraged a centralized server to manage the connection between the client application and OpenAI. You can find the code for this version here: [Previous Application](https://github.com/The-SolaAI/sola-application/tree/Previous-Application).

**Important Note:** Blockchain interactions from the previous application haven't been fully migrated to the current version yet. This functionality is under development and will be integrated in a future update.

## Local Development

To setup local development, first clone this repo.

### Environment Variables

create a .env file in the root folder of the project to store openai api key.

```
OPEN_AI_API_KEY = <>
PRVI_APP_ID = <>
HELIUS_API_KEY = <>
SOLANA_RPC = <>
WALLET_SERVICE_URL = <>
```

> During production you will have to 3rd party services to keep the key secure. Refer Cloudflare tools.

### Terminal

Type these commands to start the project.

```
npm i
npm run dev
```


