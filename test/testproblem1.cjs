
const { createsFiles, deleteFiles } = require('../problem1.cjs');

console.log('Testing Problem 1');

// Step 1: Test createFiles
createsFiles((err) => {
    if (err) {
        console.error('Error during file creation:', err);
        return;
    }
    console.log('File creation test completed successfully.');

    // Step 2: Test deleteFiles
    deleteFiles((err) => {
        if (err) {
            console.error('Error during file deletion:', err);
            return;
        }
        console.log('File deletion test completed successfully.');
    });
});
