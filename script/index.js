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
            const url = `https://openapi.programming-hero.com/api/level/${lesson.level_no}`
            fetch(url)
                .then((res) => res.json())
                .then((data) => displayLevelWord(data.data))
        })
        levelContainer.append(button);
    }
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    words.forEach((word) => {
        const card = document.createElement('div')
        card.className = "bg-white text-center p-14 rounded-lg"
        card.innerHTML = `
        <h2 class="font-bold text-3xl mb-4">${word.word}</h2>
            <p class="text-lg mb-3">Meaning /Pronounciation</p>
            <h2 class="font-bangla font-semibold text-3xl">"${word.meaning} / ${word.pronunciation}"</h2>
            <div class="flex justify-between mt-14">
                <button class="btn p-4 bg-[#1a91ff1a] hover:bg-[#1a90ff86] w-14 h-14 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class=" btn p-4 bg-[#1a91ff1a] hover:bg-[#1a90ff86] w-14 h-14 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `
        wordContainer.append(card)
    })
}


loadLessons()