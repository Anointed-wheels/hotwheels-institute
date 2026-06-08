// js/chat.js

document.addEventListener('DOMContentLoaded', () => {
    const aiTriggerBtn = document.getElementById('floatingAiBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatPanel = document.getElementById('hctiChatPanel');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const messageStage = document.getElementById('chatMessageStage');
    
    // Target the AI Chat option in your main header navbar
    const navAiLink = document.getElementById('nav-ai-link');

    // --- FUNCTIONAL TOGGLES: OPEN / CLOSE INTERFACES ---
    function toggleChatPanel(event) {
        if(event) event.preventDefault();
        chatPanel.classList.toggle('active');
        // Instantly scroll stage to bottom when workspace opens
        messageStage.scrollTop = messageStage.scrollHeight;
    }

    aiTriggerBtn.addEventListener('click', toggleChatPanel);
    closeChatBtn.addEventListener('click', () => chatPanel.classList.remove('active'));
    
    // Open panel if user clicks the link in your top Navigation Bar
    if (navAiLink) {
        navAiLink.addEventListener('click', toggleChatPanel);
    }

    // --- CONVERSATION INTERACTION HOOKS ---
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        // 1. Append User Text Bubble onto the screen
        appendMessageBubble(userText, 'user-client');
        chatInput.value = '';

        // 2. Trigger automated response simulation
        setTimeout(() => {
            simulateBotResponse(userText);
        }, 800);
    });

    function appendMessageBubble(text, senderClass) {
        const bubble = document.createElement('div');
        bubble.classList.add('msg-bubble', senderClass);
        bubble.textContent = text;
        messageStage.appendChild(bubble);
        
        // Auto-scroll screen directly down to match latest text node lines
        messageStage.scrollTop = messageStage.scrollHeight;
    }

    // --- SYSTEM DUMMY AUTO-RESPONDER SIMULATOR ---
    function simulateBotResponse(input) {
        const query = input.toLowerCase();
        let reply = "That sounds interesting! Our system engineers can assist you with that. Would you like to schedule a physical visit to our hub at Oke-Itunu, Ibadan?";

        if (query.includes('python') || query.includes('backend')) {
            reply = "Our Backend Engineering track runs for 16 weeks and deeply explores Python, Django architectures, and robust APIs!";
        } else if (query.includes('frontend') || query.includes('javascript')) {
            reply = "The Advanced Frontend Track takes 12 weeks, focusing on UI layouts, modular vanilla CSS, and responsive JavaScript interfaces.";
        } else if (query.includes('fees') || query.includes('price') || query.includes('pay')) {
            reply = "We offer flexible monthly installment paths to make our courses highly accessible. Contact admissions@hotwheelscoder.com for the breakdown!";
        }

        appendMessageBubble(reply, 'ai-bot');
    }
});