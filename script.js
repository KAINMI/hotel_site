document.getElementById('steganography-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = document.getElementById('text').value;
    const shift = parseInt(document.getElementById('shift').value, 10);
    const image = document.getElementById('image').files[0];

    if (!text || !shift || !image) {
        alert('Please fill in all fields and upload an image.');
        return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('text', text);
    formData.append('shift', shift);
    formData.append('image', image);

    // Send request to back-end
    const response = await fetch('/process', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const blob = await response.blob();
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.style.display = 'block';
    } else {
        alert('Something went wrong. Please try again.');
    }
});