document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const energyLevelSlider = document.getElementById('energy-level');
    const stressLevelSlider = document.getElementById('stress-level');
    const happinessLevelSlider = document.getElementById('happiness-level');
    const currentEmotionsInput = document.getElementById('current-emotions');
    const desiredMoodInput = document.getElementById('desired-mood');
    const genreInput = document.getElementById('genre');
    const instrumentsInput = document.getElementById('instruments');
    const tempoInput = document.getElementById('tempo');
    const preferredMoodInput = document.getElementById('preferred-mood');
    const generateButton = document.getElementById('generate-button');

    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const musicPromptElement = document.getElementById('music-prompt');
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-button');
    const stopButton = document.getElementById('stop-button');
    const statusElement = document.getElementById('status');

    // Generate music function
    generateButton.addEventListener('click', async() => {
        try {
            const moodData = {
                energy: energyLevelSlider.value,
                stress: stressLevelSlider.value,
                happiness: happinessLevelSlider.value,
                current_emotions: currentEmotionsInput.value,
                desired_mood: desiredMoodInput.value,
                genre: genreInput.value,
                instruments: instrumentsInput.value,
                tempo: tempoInput.value,
                preferred_mood: preferredMoodInput.value
            };

            const response = await fetch('/generate-music', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moodData)
            });

            const data = await response.json();

            if (data.success) {
                audioPlayer.src = data.audio_url.replace(/\\/g, '/');
                musicPromptElement.textContent = data.prompt;
                statusElement.textContent = data.message;
                resultsSection.classList.remove('hidden');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating music.');
        }
    });

    // Play/Pause functionality
    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playButton.textContent = 'Play';
        }
    });

    // Stop functionality
    stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playButton.textContent = 'Play';
    });

    audioPlayer.addEventListener('ended', () => {
        playButton.textContent = 'Play';
    });
});