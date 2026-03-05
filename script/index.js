const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<div class="badge badge-soft badge-info text-lg">${el}</div>`);
    return htmlElements.join(' ')
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN";
    window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if (status) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    } else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLesson(json.data))
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    for (const lesson of lessons) {
        const button = document.createElement('button');
        button.className = "lesson-btn btn btn-outline btn-primary";
        button.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}`;
        button.addEventListener('click', () => {
            const lessonBtns = document.getElementsByClassName('lesson-btn')
            for (const btn of lessonBtns) {
                btn.classList.remove('btn-active');
            }
            button.classList.add('btn-active')
            manageSpinner(true)
            const url = `https://openapi.programming-hero.com/api/level/${lesson.level_no}`
            fetch(url)
                .then((res) => res.json())
                .then((data) => displayLevelWord(data.data))
        })
        levelContainer.append(button);
    }
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div>
        <h2 class="font-semibold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    </div> 
    <div>
        <h2 class="font-semibold text-lg">Meaning</h2>
        <p class="font-medium text-lg">${word.meaning}</p>
    </div>
    <div>
        <h2 class="font-semibold text-lg">Example</h2>
        <p class="font-medium text-lg">${word.sentence}</p>
    </div>
    <div>
        <h2 class="font-semibold text-lg">Synonyms</h2>
        <div class="flex gap-3 mt-2">${createElements(word.synonyms)}</div>
    </div>
    `
    document.getElementById('word_modal').showModal()
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-sm mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `
        manageSpinner(false)
        return;
    }

    words.forEach((word) => {
        const card = document.createElement('div')
        card.className = "bg-white text-center p-14 rounded-lg"
        card.innerHTML = `
        <h2 class="font-bold text-3xl mb-4">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="text-lg mb-3">Meaning /Pronounciation</p>
            <h2 class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায়নি'}"</h2>
            <div class="flex justify-between mt-10">
                <button onclick="loadWordDetail(${word.id})" class="btn p-4 bg-[#1a91ff1a] hover:bg-[#1a90ff86] w-14 h-14 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class=" btn p-4 bg-[#1a91ff1a] hover:bg-[#1a90ff86] w-14 h-14 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `
        wordContainer.append(card)
    })
    manageSpinner(false)
}


loadLessons()

document.getElementById('btn-search').addEventListener('click', () => {
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();

    const lessonBtns = document.getElementsByClassName('lesson-btn')
    for (const btn of lessonBtns) {
        btn.classList.remove('btn-active');
    }

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then((res) => res.json())
        .then((data) => {
            const allWords = data.data;
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue))
            displayLevelWord(filterWords)
        })
})