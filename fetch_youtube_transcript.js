const { YoutubeTranscript } = require('youtube-transcript');
const fs = require('fs');

const videoUrl = 'https://youtu.be/SHulNC_6KRc';

async function getTranscript() {
    try {
        console.log(`Extrayendo transcripción de: ${videoUrl}`);

        const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);

        // Formatear transcripción
        const fullText = transcript.map(item => item.text).join(' ');
        const timestampedText = transcript.map(item => {
            const minutes = Math.floor(item.offset / 60000);
            const seconds = Math.floor((item.offset % 60000) / 1000);
            return `[${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}] ${item.text}`;
        }).join('\n');

        // Guardar archivos
        fs.writeFileSync('youtube_transcript_full.txt', fullText, 'utf8');
        fs.writeFileSync('youtube_transcript_timestamped.txt', timestampedText, 'utf8');
        fs.writeFileSync('youtube_transcript_raw.json', JSON.stringify(transcript, null, 2), 'utf8');

        console.log('\n' + '='.repeat(80));
        console.log('TRANSCRIPCIÓN COMPLETA:');
        console.log('='.repeat(80));
        console.log(fullText);
        console.log('\n' + '='.repeat(80));
        console.log('\nArchivos guardados:');
        console.log('- youtube_transcript_full.txt');
        console.log('- youtube_transcript_timestamped.txt');
        console.log('- youtube_transcript_raw.json');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

getTranscript();
