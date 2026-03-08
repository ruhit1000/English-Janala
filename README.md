# English Janala

## Overview

**English Janala** is an educational web application that helps users learn English vocabulary by providing translations from English to Bangla. This project features a dynamic interface where users can search for words, view their meanings, and hear their pronunciations. The application fetches vocabulary data from an API and displays it in a structured and engaging layout.

Built using HTML5, TailwindCSS, DaisyUI, and modern JavaScript (ES6+), this project emphasizes **dynamic content rendering** and **user interactivity**. For the first time, an **API** was used to fetch data and update the website in real-time. Additionally, each vocabulary entry includes a button that plays the pronunciation of the word, providing a more interactive learning experience.

## Features

* Vocabulary list with **English to Bangla** translations
* Search functionality to find specific words quickly
* Pronunciation button to play the sound of each word
* Dynamic data fetching via an **API** for real-time content updates
* Clean, responsive UI designed with **TailwindCSS** and **DaisyUI**
* Interactive learning experience with real-time updates

## Challenges

One of the primary challenges was working with an **API** to fetch data dynamically and ensure that it loads correctly in the user interface. This required a solid understanding of **asynchronous JavaScript** and the use of **fetch** or **axios** to handle API requests and responses.

Another challenge was implementing the **pronunciation feature**, which required integrating a button for audio playback of each word. Handling the pronunciation in sync with the display of the word and making sure the button functions correctly required careful DOM manipulation.

Lastly, adding **search functionality** presented a challenge in terms of ensuring that the vocabulary list filters correctly as users type, while maintaining performance with a large set of words. The solution involved efficiently updating the DOM without causing unnecessary re-renders.
