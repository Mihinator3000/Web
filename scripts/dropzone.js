const codeArea = document.querySelector(".code-area");

const dropzoneOptions = {
    url: "/post",
    // Max upload filesize (mb)
    maxFilesize: 2,
    // Only one file can be uploaded at once
    parallelUploads: 1,
    // Remove previews
    disablePreviews: true,
    // Function that called on loaded file
    accept: (file, _) => {
        // Creating loaded file reader
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => {
            // Setting code area content to file content
            codeArea.textContent = e.target.result.toString();
        }
    }
}

// Initializing dropzone on #load-button
const dropzone = new Dropzone("#load-button", dropzoneOptions);