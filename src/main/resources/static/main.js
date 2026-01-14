
document.addEventListener("DOMContentLoaded", () => {

    let stompClient = null;
    let user = null;

    // Connect to server
    function connect(e) {
        e.preventDefault();

        user = document.getElementById("connect").value.trim();
        if (!user) {
            alert("Please enter a username!");
            return;
        }

        const socket = new SockJS('/ws-endpoints');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log("Connected: " + frame);

            stompClient.subscribe('/topic/messages', function (message) {
                const msg = JSON.parse(message.body);
                const messages = document.querySelector(".messages");

                if (msg.sender !== user) {
                    const bubble = document.createElement("div");
                    bubble.className = "msg incoming";
                    bubble.innerHTML = `
                        ${msg.content}
                        <div class="meta">${msg.timeStamp} • ${msg.sender}</div>
                    `;
                    messages.appendChild(bubble);
                    messages.scrollTop = messages.scrollHeight;
                }
            });
        });

        document.getElementById("connectForm").style.display = "none";
    }

    // Send message
    function SendMSG(e) {
        e.preventDefault();

        if (!stompClient || !stompClient.connected) {
            alert("Not connected!");
            return;
        }

        const input = document.getElementById("message");
        const text = input.value.trim();

        if (text !== "") {
            const messages = document.querySelector(".messages");

            const bubble = document.createElement("div");
            bubble.className = "msg outgoing";
            bubble.innerHTML = `
                ${text}
                <div class="meta">${new Date().toISOString()} • You</div>
            `;
            messages.appendChild(bubble);

            stompClient.send("/app/chat", {}, JSON.stringify({
                sender: user,
                content: text,
                type: "Chat",
                timeStamp: new Date().toISOString()
            }));

            input.value = "";
            messages.scrollTop = messages.scrollHeight;
        }
    }

    document.getElementById("connectForm").addEventListener("submit", connect);
    document.getElementById("chatForm").addEventListener("submit", SendMSG);
});
