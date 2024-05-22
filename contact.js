const form = document.getElementById('contactForm');

async function submitForm(formData) {
    try {
        const response = await fetch('https://formspree.io/f/xeqynpoz', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });
        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Сервер қателік көрсетті: ' + (responseData.error || response.status));
        }
    } catch (error) {
        console.error('Catch error:', error);
        return { success: false, error: 'Форманы жіберу кезінде қателік болды: ' + error.message };
    }
}
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const result = await submitForm(formData); 
    if (result.success) {
        alert('Хабарлама сәтті жіберілді! Біз сізбен жақын арада байланысамыз.');
        form.reset();
    } else {
        alert(result.error);
    }
});