class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.front = null;
    }

    enqueue(data, priority) {
        const newNode = new Node(data, priority);

        if (!this.front || this.front.priority > priority) {

            newNode.next = this.front;
            this.front = newNode;
        } else {

            let current = this.front;
            while (current.next && current.next.priority <= priority) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    dequeue() {
        if (!this.front) return null;
        const data = this.front.data;
        this.front = this.front.next;
        return data;
    }

    isEmpty() {
        return this.front === null;
    }

    getQueue() {
        let current = this.front;
        const queueArray = [];
        while (current) {
            queueArray.push(${current.data} (Priority: ${current.priority}));
            current = current.next;
        }
        return queueArray;
    }
}

const emergencyQueue = new PriorityQueue();

document.getElementById("callForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const details = document.getElementById("details").value;
    const priority = parseInt(document.getElementById("priority").value);
    emergencyQueue.enqueue(details, priority);


    document.getElementById("output").textContent = Added Emergency: ${details} (Priority: ${priority});


    document.getElementById("callForm").reset();

    updateQueueDisplay();

    setTimeout(() => {
        document.getElementById("output").textContent = "";
    }, 2000);
});

document.getElementById("dispatch").addEventListener("click", function() {
    const dispatchedCall = emergencyQueue.dequeue();

    const outputDiv = document.getElementById("output");
    if (dispatchedCall) {
        outputDiv.textContent = Dispatched Emergency: ${dispatchedCall};
    } else {
        outputDiv.textContent = "No more emergencies to dispatch.";
    }

    updateQueueDisplay();
});

function updateQueueDisplay() {
    const queueList = document.getElementById("queueList");
    queueList.innerHTML = "";

    const currentQueue = emergencyQueue.getQueue();
    currentQueue.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        queueList.appendChild(li);
    });

    if (currentQueue.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "Queue is empty";
        queueList.appendChild(emptyMessage);
    }
}
