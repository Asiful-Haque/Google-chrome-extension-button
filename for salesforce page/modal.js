function closeModal() {
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
        modalContainer.style.display = "none"; // Hide the modal
        modalContainer.remove(); // Remove modal from the DOM
    }

    // Retrieve and display the captured text
    const content = localStorage.getItem('capturedContent');
    const displayContent = document.getElementById('displayContent');
    if (displayContent) {
        displayContent.textContent = content; // Display the captured text in the modal
    }
}
