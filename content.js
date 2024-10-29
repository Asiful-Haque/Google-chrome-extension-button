// Function to add button to the page
console.log("calling program");
function addButtonToPage() {
    console.log("hello");
    // Ensure button does not already exist
    if (!document.getElementById("captureButton")) {
        console.log("Adding capture button to the page.");

        // Create button element
        const button = document.createElement("button");
        button.id = "captureButton";
        button.textContent = "Capture Text";
        button.type = "button";

        // Style the button to appear in the top-right corner of the page
        button.style.position = "fixed";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.backgroundColor = "#4CAF50";
        button.style.color = "white";
        button.style.border = "none";
        button.style.padding = "8px 12px";
        button.style.cursor = "pointer";
        button.style.borderRadius = "4px";
        button.style.fontSize = "14px";
        button.style.zIndex = "1000";

        // Append the button to the body
        document.body.appendChild(button);

        // Add click event listener to capture and display modal
        button.addEventListener("click", () => {
            const textArea = document.getElementById("issue_body");
            const content = textArea ? textArea.value : "No text area found";
            localStorage.setItem('capturedContent', content);
            console.log("Textarea content saved:", content);

            // Load the modal HTML
            loadModal();
        });
    }
}

// Function to load and display modal
function loadModal() {
    // Check if modal already exists
    if (document.getElementById("modalContainer")) {
        return; // Avoid duplicate modals
    }

    // Load the CSS file for the modal
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('style.css');
    document.head.appendChild(link);

    // Fetch and load modal content from `content.html`
    fetch(chrome.runtime.getURL('content.html'))
        .then(response => response.text())
        .then(data => {
            const modalContainer = document.createElement('div');
            modalContainer.id = "modalContainer";
            modalContainer.innerHTML = data;

            // Append modal to body and style it
            document.body.appendChild(modalContainer);

            // Display the captured content
            const displayContent = modalContainer.querySelector('#displayContent');
            const content = localStorage.getItem('capturedContent');
            if (displayContent) {
                displayContent.textContent = content;
            }

            // Attach event listener to close button
            const closeModalButton = modalContainer.querySelector('#closeModalButton');
            closeModalButton.addEventListener('click', () => {
                modalContainer.remove();
            });
        })
        .catch(error => console.error("Error loading modal:", error));
}
console.log("calling to add button");
// Add button when the entire window has loaded
window.addEventListener("load", addButtonToPage);

