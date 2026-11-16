# The Shakespearean ABC — Words, Wit & Wonder

A static, responsive Shakespeare vocabulary website built with plain HTML, CSS, and JavaScript. It includes 26 A–Z entries, a searchable gallery, one JPG per entry, and two separately replaceable MP3 files per entry.

## Run locally

Because the site loads `data/vocabulary.json` with `fetch()`, run it through a local web server rather than opening `index.html` directly.

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `shakespearean-abc`.
2. Upload the contents of this folder to the repository root (keep the folder structure).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site.

## Replace audio with your own recordings

Every entry has two independent audio paths in `data/vocabulary.json`:

- `assets/audio/words/A.mp3` — the vocabulary word
- `assets/audio/quotes/A.mp3` — the full quotation

Replace a file with a new MP3 using the same filename to keep the site unchanged. If you prefer a different naming scheme, edit the corresponding `wordAudio` and `quoteAudio` values in `data/vocabulary.json`.

**Audio note:** The included MP3s are starter synthetic English narration generated locally with eSpeak and encoded with FFmpeg. They are not recordings of actors and are not a cloud/LLM voice model. They are included so both players work immediately; replace them with your preferred AI voice exports or your own recordings when ready.

## Replace artwork

Each letter has an independent JPG at `assets/images/A.jpg` through `Z.jpg`. Replace any image with another JPG of the same filename, or update the `image` field in `data/vocabulary.json`. `assets/images/hero.jpg` is the hero background.

The letter JPGs are individual crops from an original AI-generated visual concept sheet. Some of the small concept tiles contain decorative letter/word lettering. They are usable starter artwork; for a polished public launch, consider replacing these with 26 separately generated, text-free paintings.

## Edit vocabulary and quotations

All entry content lives in `data/vocabulary.json`. Each record includes:

- `letter`, `word`, `partOfSpeech`, `definition`
- `quote`, `play`, `scene`, `speaker`, `note`
- `image`, `wordAudio`, `quoteAudio`

The quotations are from Shakespeare's public-domain plays. Editorial punctuation and line numbering can vary between editions; verify against the edition you choose before formal publication. The X entry uses the proper name **Xanthippe**, and Z uses the period exclamation **Zounds** because those are attested Shakespearean forms beginning with those letters.

## Project structure

```text
shakespearean-abc/
├── index.html
├── style.css
├── script.js
├── README.md
├── data/
│   └── vocabulary.json
└── assets/
    ├── images/       # A.jpg ... Z.jpg, hero.jpg
    └── audio/
        ├── words/    # A.mp3 ... Z.mp3
        └── quotes/   # A.mp3 ... Z.mp3
```

## Sources for checking text

- Folger Shakespeare Library: <https://www.folger.edu/explore/shakespeares-works/>
- Royal Shakespeare Company, famous quotations: <https://www.rsc.org.uk/shakespeare/themes/famous-quotes>
- Open Source Shakespeare: <https://www.opensourceshakespeare.org/>
- Shakespeare's Words, concordance and glossary: <https://www.shakespeareswords.com/>

## License

The original HTML, CSS, JavaScript, and data structure in this project are provided under the MIT License. Shakespeare's original texts are public domain. Generated artwork and the bundled starter audio are project assets; see `LICENSE` for the project terms.
