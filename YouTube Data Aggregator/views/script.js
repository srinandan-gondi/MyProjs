document.addEventListener('DOMContentLoaded', () => {
    const channelForm = document.getElementById('channelForm');
    const linkInput = document.getElementById('link');
    const handleInput = document.getElementById('handle');
    const selectedInput = document.getElementById('selectedInput');

    channelForm.addEventListener('submit', (event) => {
        if (linkInput.value.trim() === '' && handleInput.value.trim() === '') {
            event.preventDefault();
            alert('Please fill in one input field.');
        } else if (linkInput.value.trim() !== '' && handleInput.value.trim() !== '') {
            event.preventDefault();
            alert('Please fill in only one field: Channel Link or Username.');
        } else {
            // Determine the filled input
            selectedInput.value = linkInput.value.trim() !== '' ? 'link' : 'username'; 
        }
    });


});

