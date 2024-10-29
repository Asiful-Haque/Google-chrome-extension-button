// Function to add button to the page
console.log("calling program");

function addButtonToPage() {
    console.log("hello");

    // Check for the specific textarea element with id "HtmlValue"
    const targetTextArea = document.getElementById("HtmlValue");

    if (targetTextArea) {
        console.log("Textarea with id 'HtmlValue' found.");
    } else {
        console.log("Textarea with id 'HtmlValue' not found.");
    }

    // Ensure button does not already exist
    if (!document.getElementById("captureButton")) {
        console.log("Adding capture button to the page.");

        // Create button element
        const button = document.createElement("button");
        button.id = "captureButton";
        button.textContent = "Capture Text";
        button.type = "button";

        // Style the button to appear in the top-right corner of the page with improved design
        button.style.position = "fixed";
        button.style.right = "1250px";
        button.style.background = "#28a745"; // More modern green
        button.style.border = "none";
        button.style.padding = "10px 15px"; // Increased padding for larger button
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";
        button.style.fontSize = "14px";
        button.style.fontWeight = "bold"; // Bolder font for emphasis
        button.style.zIndex = "1000";
        button.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)"; // Adds a shadow for depth
        button.style.transition = "background-color 0.3s ease, transform 0.1s ease"; // Smooth transition

        // Hover effect for button
        button.onmouseover = () => button.style.backgroundColor = "#218838";
        button.onmouseleave = () => button.style.backgroundColor = "#28a745";

        // Click effect
        button.onmousedown = () => button.style.transform = "scale(0.95)";
        button.onmouseup = () => button.style.transform = "scale(1)";

        // Append the button to the body
        document.body.appendChild(button);

        // Add click event listener to capture and display modal
        button.addEventListener("click", () => {
            const content = targetTextArea ? targetTextArea.value : "No text area found";
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
